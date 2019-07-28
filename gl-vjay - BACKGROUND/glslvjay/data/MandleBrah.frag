#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER;


uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

vec2 c_sq(vec2 z){
	return vec2(z.x*z.x-z.y*z.y, 2.0*z.x*z.y);
}

vec2 f(vec2 z, vec2 c){
	vec2 nz;
	// nz = c_sq(z) + c;
	nz = c_sq(vec2(z.y, z.x)) + c;
	return nz;
}

float iteration(vec2 z, float i){
	float log_zn, nu, iterate;
	log_zn = log(z.x*z.x+z.y*z.y)/2.0;
	nu = log(log_zn/log(2.0))/log(2.0);
	iterate = i + 1.0 - nu;
	return iterate;
}

void main( void ) {
	vec2 pos = (gl_FragCoord.xy-0.5*resolution)/(0.5*vec2(resolution.y));
	pos = pos*10.0;
	pos = pos/vec2(exp2(mod(0.5*time, 17.0))) - vec2(-0.8787, -0.155);
	float mand, v;
	vec2 z;
	vec3 color;
	mand = 0.0;
	z = vec2(0.0);
	
	for (float i=0.0; i<200.0; i++){
		z = f(z, pos);
		mand = (z.x*z.x+z.y*z.y > 256.0) && (mand==0.0) ? iteration(z, i) : mand;
	}
	mand = mod(mand*0.05, 1.0);
	v = mod(mand*mand*20.0, 1.0);
	color = hsv(mand, 1.0, v);
	gl_FragColor = vec4(color, 1.0);
}