#ifdef GL_ES
precision mediump float;
#endif


#define PROCESSING_COLOR_SHADER


uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform sampler2D backbuffer;


uniform float freq1;
uniform float freq2;
uniform float freq3;
uniform float freq4;



uniform float FX1;
uniform float FX2;
uniform float FX3;


uniform float Scale;

const float PI = 3.1415926;

vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1., 2./3., 1./3., 3.);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), .0, 1.), s);
}

float sdBox(vec3 p, vec3 b){
    vec3 d = abs(p) - b;
    return length(max(d,.1))
        + min(max(d.x,max(d.y,d.z)),FX3);
}

vec2 distfunc(vec3 p){
    vec3 size = vec3(.5,.5,.5);
    // float d1 = sdBox(p,size);
    float d1 = sdBox(p + vec3(freq3,2.0,freq2),size);
    float d2 = sdBox(p + vec3(freq1,freq2,freq3),size);
    
    float d = min(d1,d2);
    
    float o = .0;
    
    if(d1>d2){
        o = 1.;
    }
    
    vec2 rdo = vec2(d,o);
    return rdo;
}

vec3 getNormal(vec3 p){
    float d = .0001;
    vec3 r = normalize(vec3(
        distfunc(p + vec3(d, 0.0, 0.0)).x - distfunc(p + vec3(-d, 0.0, 0.0)).x,
        distfunc(p + vec3(0.0, d, 0.0)).x - distfunc(p + vec3(0.0, -d, 0.0)).x,
        distfunc(p + vec3(d, 0.0, d)).x - distfunc(p + vec3(0.0, 0.0, -d)).x
        ));
    return r;
}

void main(){
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution)/min(resolution.x, resolution.y);
    vec3 cam = vec3(3.,.0,FX1);
    vec3 cm = vec3(tan(time), cos(time),.0);
    cam += cm;
    float scZ = Scale + 3.5;
    float depth = .0;
    vec3 rayD = normalize(vec3(p,scZ));
    vec3 col = vec3(.0);
    
    for(int i = 0; i < 99; i++){
        float d = .001;
        vec3 rayP = rayD * depth + cam;
        float dist = distfunc(rayP).x;
        float obj = distfunc(rayP).y;
        vec3 normal = getNormal(rayP);
        
        float emm = 5.0;
        emm = min(emm,dist);
        float emmP = pow(emm + FX2, -5.5);
        
        if(dist < .0001){
            col = vec3(1.);
            if(obj == .0)
            {
                col = vec3(abs(sin(time)),.0,.0);
            }
            else
            {
                col = vec3(.0,abs(cos(time)),.0);
            }
            break;
        }
        
        col += vec3(1.,.0,.0) * emmP;
        depth += dist;
    }
    
    gl_FragColor = vec4(col,1.0);
}