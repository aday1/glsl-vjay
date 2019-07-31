
uniform float FX1;

uniform float freq1;
uniform float freq2;
uniform float freq3;
uniform float freq4;

uniform float col1;
uniform float movement;
uniform float rotation;

#ifdef GL_ES
precision highp float;
#endif


#define PROCESSING_COLOR_SHADER


uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec2 hash(vec2 p)
{
    p=vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.1)));
    return freq1+freq2*fract(sin(p)*43758.5453123);
}


float noise( in vec2 p )
{
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
    vec2 i = floor( p + (p.x+p.y)*K1 );
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
    vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    return dot( n, vec3(freq1 * 50.0) );
}

float fbm(vec2 uv)
{
    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
    float f  = 0.5000*noise( uv ); uv = m*uv;
    f += 0.2500*noise( uv ); uv = m*uv;
    f += 0.1250*noise( uv ); uv = m*uv;
    f += 0.0625*noise( uv ); uv = m*uv;
    f = 0.5 + 0.5*f;
    return f;
}

vec3 draw(vec2 pos)
{
    float _s = sign(pos.y) * (200.0+(time*0.5));
    pos.y=mod(abs(pos.y), 1.0);
    pos.x += _s;
    
    vec3 xx=vec3(fbm(pos-vec2(0.0,time*0.45)));
        float s=3.75;
    float m=pow(xx.x, pos.y*s)+.5;
    vec3 color=vec3(m, 0.75*m*m, 0.3*m*m*m*m*m);
    return color;
}

void main( void )
{
    vec2 pos=(gl_FragCoord.xy/resolution.xy)*2.0-1.0;
    pos.x*=resolution.x/resolution.y;
    vec3 col = draw(pos);
    gl_FragColor=vec4(col, 1.0);
}