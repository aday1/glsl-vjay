#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform float time;
uniform vec2 resolution;

uniform float FX1;
uniform float FX2;
uniform float FX3;


#define white vec3(1.)
#define r resolution
#define t time

const float PI = 3.1415926;
const float PI2 = PI * 0.5;

void main( void ) {
    vec2 p =( gl_FragCoord.xy * 2. - resolution.xy )/min(resolution.x, resolution.y);
    float l = length(p); 
    
    
    
    float arctan =  (atan(p.y, p.x)  +  FX2) / FX3;
    float wave = sin(arctan *  PI * 100.);
    
    float circle = sin(l * FX1 * 30.0 - time * 1.0) * wave;
    
    vec3 destColor = vec3(circle);  
    gl_FragColor = vec4(destColor, 1.0);
}