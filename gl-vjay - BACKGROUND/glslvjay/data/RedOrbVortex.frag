#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;


uniform float freq1;
uniform float freq2;
uniform float freq3;
uniform float freq4;

uniform float FX1;
uniform float FX2;

vec2 displayPos;
vec3 col=vec3(0);

#define rot(x) mat2(cos(x),-sin(x),sin(x),cos(x))
const float PI= acos(-1.);

float sdSphere(vec3 p,float r){
	return length(p)-r;
}
float sdBox( vec3 p, vec3 b )
{
  vec3 d = abs(p) - b;
  return length(max(d,0.0))+ min(max(d.x,max(d.y,d.z)),0.0);
}

vec3 rep(vec3 p,vec3 span){
	return mod(p,span)-span/2.;
}
float distFunc(vec3 pos){
	//float t=PI/6.;
	//pos.xy*=mat2(cos(2.*t),sin(2.*t),sin(2.*t),-cos(2.*t));
	float t=PI/6.*time;
	//pos.xy*=rot(t);
	int j=0;
	j=int(length(pos.xy)/(10.))+1;
	pos.xy*=rot(t/float(j));
	col+=vec3(5.4,freq2 * 1.8,freq4 * 4.0)/100.*(pow(float(j),freq1 * 5.0)); // COLOR
	float d;
	d=sdSphere(rep(pos,vec3(10.)),FX2 - 0.1);
	return d;
}

void main( void ) {
    vec2 p = ( gl_FragCoord.xy * 2. - resolution.xy ) / min(resolution.x, resolution.y);
	displayPos=p;

    vec3 cameraPos = vec3(0., 0., -10.+time);
    float screenZ = FX1;
    vec3 rayDirection = normalize(vec3(p, screenZ));
	
    float depth = 0.0;
	
	const int rayCnt=1000;
    for (int i = 0; i < rayCnt; i++) {
        vec3 rayPos = cameraPos + rayDirection * depth;
        float dist = distFunc(rayPos);
	    if(dist<0.0001){
		    col*=vec3(float(i)/float(rayCnt));
		    break;
	    }
        depth += dist;
    }

    gl_FragColor = vec4(col, 1.0);
}