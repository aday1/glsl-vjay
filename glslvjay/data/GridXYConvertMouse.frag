#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

// Processing specific input
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

uniform float SCALE;


void main(){
    
    vec2 st = gl_FragCoord.xy/resolution.xy;

    float dist = distance(st, vec2(0.5));

    float height = sin(exp((dist + sin(SCALE) *  0.5 ) * 10.0));

    gl_FragColor = vec4(vec3(height), 1.0);

}