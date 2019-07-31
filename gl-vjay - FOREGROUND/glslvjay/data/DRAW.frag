#ifdef GL_ES
precision mediump float;
#endif

// #extension GL_OES_standard_derivatives : enable
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
uniform float FX3;
uniform float FX4;

uniform float Move1;
uniform float Move2;
uniform float Move3;
uniform float Move4Step;


mat2 rotate(float a) {
	float c = cos(a);
	float s = sin(a);
	return mat2(c, s, -s, c);
}

float line(vec2 p, vec2 a, vec2 b) {
	vec2 pa = p - a;
	vec2 ba = b - a;
	float t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, FX1);
	return length(pa - ba * t);
}

vec3 vertices[9];
vec2 project[9];
void main() {
	
	vec2 uv = (2. * gl_FragCoord.xy - resolution) / resolution.y;
	uv *= 3.;
		
	// setup vertices
	vertices[0] = vec3(-1, -1, -1);
	vertices[1] = vec3(1, -1, -1);
	vertices[2] = vec3(1, 1, -1);
	vertices[3] = vec3(-1, 1, -1);
	vertices[4] = vec3(-1, -1, 1);
	vertices[5] = vec3(1, -1, 1);
	vertices[6] = vec3(1, 1, 1);
	vertices[7] = vec3(-1, 1, 1);
	vertices[8] = vec3(0, 2, 0);
	
	// project
	for (int i = 0; i < 9; i++) {
		vertices[i].xz *= rotate(time * 0.5);
		float scl = 1.0 / (1. + vertices[i].z * 0.2);
		project[i] = vertices[i].xy * scl;
	}
	
	// draw based on index
	float d = line(uv, project[0], project[1]);
	d = min(d, line(uv, project[1], project[2]));
	d = min(d, line(uv, project[2], project[3]));
	d = min(d, line(uv, project[3], project[0]));
	d = min(d, line(uv, project[4], project[5]));
	d = min(d, line(uv, project[5], project[6]));
	d = min(d, line(uv, project[6], project[7]));
	d = min(d, line(uv, project[7], project[4]));	
	d = min(d, line(uv, project[0], project[4]));
	d = min(d, line(uv, project[1], project[5]));
	d = min(d, line(uv, project[2], project[6]));
	d = min(d, line(uv, project[3], project[7]));
	d = min(d, line(uv, project[2], project[8]));
	d = min(d, line(uv, project[3], project[8]));
	d = min(d, line(uv, project[6], project[8]));
	d = min(d, line(uv, project[7], project[8]));
	
	// color the scene
	vec3 col = vec3(0);
	col += 1.0 - floor(d * 64.0 - fract(dot(floor(gl_FragCoord.xy), vec2(0.5, 0.75 * floor(gl_FragCoord.y)))) * 4.0);
	
	gl_FragColor = vec4(col, 1.);

}