/*{ "osc": 4000 }*/

#ifdef GL_ES
precision mediump float;
#endif


#ifdef GL_ES
precision highp float;
#endif

// Type of shader expected by Processing
#define PROCESSING_COLOR_SHADER

// Processing specific input
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

uniform float FX1;
uniform float FX2;
uniform float FX3;
uniform float FX4;

uniform float COL1;
uniform float COL2;
uniform float COL3;

uniform float SHIFTX1;
uniform float SHIFTY1;

uniform float SHIFTX2;
uniform float SHIFTY2;

uniform float SCALE;



#define SRC_N 5.0
#define SRC_D .05
#define SRC_R .003
#define SRC_A .4
#define TWO_PI (2.0 * 3.1415)


void main( void ) {

	vec2 position = gl_FragCoord.xy / resolution.y;
	float max_x = resolution.x / resolution.y;
	vec2 mouse_p = vec2(FX2 * max_x, FX1);

	float q = FX1;
	float src_f = TWO_PI * mix(FX3 * 25.0, FX2 * 50.0, FX1 * 3.0);
	float src_d = SRC_D * mix(SHIFTY2 * 50.1,  SHIFTX1, SHIFTX2);

	for (float i = 0.0; i < SRC_N; i++) {
		vec2 src_pos = vec2((max_x - src_d * (SRC_N - 1.0)) / 2.0 + float(i) * src_d,  SHIFTY1);
		float l = abs(abs(position.x-src_pos.x) - abs(position.y-src_pos.y));
		if (l < SRC_R) {
			gl_FragColor = vec4(1.0);
			return;
		}
		q += sin(l * src_f + i * SRC_A - time * FX4);
	}
	q /= SRC_N;
	gl_FragColor = vec4(q * q);
}
