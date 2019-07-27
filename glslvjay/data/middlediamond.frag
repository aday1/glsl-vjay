#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

#define PROCESSING_COLOR_SHADER

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

uniform float freq1;
uniform float freq2;
uniform float freq3;
uniform float freq4;

uniform float fader2;
	

float plot(float st, float pct) {
	return smoothstep( pct - 0.02, pct, st) - 
	       smoothstep( pct, pct  + fader2, st);	
}

void main( void ) {
	vec2 st = gl_FragCoord.xy / resolution;

	float y = st.x;
	
	vec3 color = vec3(y);
	
	float pct = plot(st.y, y);


	color = (1.0-pct) * color + pct * vec3(freq1,freq4,freq3);
	
	pct = plot(st.y, 1.-y);

	color = (1.0-pct) * color + pct * vec3(freq1,freq3,freq4);
	
	pct = plot(st.x, 1.-y);

	color = (1.0-pct) * color + pct * vec3(freq2,freq4,freq3);
	
	pct = plot(st.y, 1.-st.y);

	color = (1.0-pct) * color + pct * vec3(freq4,freq1,freq4);
	
	gl_FragColor = vec4(color, 1.0);
}