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

uniform float COL1;



float rphase(float phase, int i) {
	return .05 + 5.0 * fract(float(i) * phase * 325.5234 + .1235);
}
	

void main( void ) {

	vec2 position = (gl_FragCoord.xy / resolution.y);
	
	float x = position.x;
	float y = position.y;
	float f = 0.0;
	float freq = 1.0;
	float phase = 1.2;
	for (int i = 0; i < 9; i++) {
		f += sin(x * y * freq + phase);
		phase = rphase(phase, i);
		freq *= FX1 + fract(phase) * .1;
		f += sin(x * freq + time * .1 + phase);
		phase = rphase(phase, i);
		freq *= 1.05 + fract(phase) * .1;
		f += sin((x + y + time * .1) * freq + phase);
		phase = rphase(phase, i);
		freq *= FX2 * 1.05 + fract(phase) * .1;
		f += sin(y * freq + phase - time * .1);
		phase = rphase(phase, i);
		freq *= 1.05 + fract(phase) * .1;
	}

	gl_FragColor = vec4(sin(f + 2.5 * freq1 * 3.1 + .3), sin(f + 2.1), sin(f + COL1), freq3);

}