#ifdef GL_ES
precision mediump float;
#endif


#define PROCESSING_COLOR_SHADER;


uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

uniform float freq1;
uniform float freq2;
uniform float freq3;
uniform float freq4;

uniform float FX1;





void main() {
	// removed the loop 
	vec2 st = (gl_FragCoord.xy - .5 * resolution) / resolution.y;
	float t = 1. / length(st);
	vec2 uv = st * t + vec2(0., t + time);
		gl_FragColor = vec4(dot(cos(uv * (1. + 10.)), sin(uv * FX1 * 5.5) - 
					sin(uv + time - length(uv * 10.))) + vec4(1, freq1, 1, freq2)) *
				(length(st));	
}