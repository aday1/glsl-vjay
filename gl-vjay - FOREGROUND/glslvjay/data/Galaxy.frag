// Based on https://www.shadertoy.com/view/MslGWN by CBS

#ifdef GL_ES
precision highp float;
#endif

// Type of shader expected by Processing
#define PROCESSING_COLOR_SHADER

// Processing specific input
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

uniform float freq1;
uniform float freq2;
uniform float freq3;
uniform float freq4;

uniform sampler2D iChannel0;
uniform float iChannel0ar;

// Layer between Processing and Shadertoy uniforms
vec3 iResolution = vec3(resolution,0.0);
float iGlobalTime = time;

float myAr = resolution.x / resolution.y;

uniform vec2 mousePressed; // (0.0,0.0) no click, (1.0,1.0) left mouse button pressed
vec4 iMouse = vec4(mouse.xy,mousePressed.xy);


//shader specif uniforms
uniform float HideStars;

// ------- Below is the unmodified Shadertoy code ----------

//CBS
//Parallax scrolling fractal galaxy.
//Inspired by JoshP's Simplicity shader: https://www.shadertoy.com/view/lslGWr

// http://www.fractalforums.com/new-theories-and-research/very-simple-formula-for-fractal-patterns/
float field(in vec3 p,float s) {
	float strength = 7. + .03 * log(1.e-6 + fract(sin(iGlobalTime) * 4373.11));
	float accum = s/4.;
	float prev = 0.;
	float tw = 0.;
for (int i = 0; i < 18; ++i) {
		float mag = dot(p, p);
		p = abs(p) / mag + vec3(-.5, -.4, -1.5);
		float w = exp(-float(i) / 7.);
		accum += w * exp(-strength * pow(abs(mag - prev), 2.2));
		tw += w;
		prev = mag;	}
	return max(0., 5. * accum / tw - .7);
}

// Less iterations for second layer
float field2(in vec3 p, float s) {
	float strength = 10. + .55 * log(1.e-6 + fract(sin(iGlobalTime) * 4373.11));
	float accum = s/4.;
	float prev = 0.;
	float tw = 0.;
	for (int i = 0; i < 18; ++i) {
		float mag = dot(p, p);
		p = abs(p) / mag + vec3(-.5, -.4, -1.5);
		float w = exp(-float(i) / 5.);
		accum += w * exp(-strength * pow(abs(mag - prev), 3.6)); // Fix strenght?
		tw += w;
		prev = mag;
	}
	return max(0., 5. * accum / tw - .7);
}

vec3 nrand3( vec2 co )
{
	vec3 a = fract( cos( co.x*8.3e-3 + co.y )*vec3(1.3e5, 4.7e5, 2.9e5) );
	vec3 b = fract( sin( co.x*0.3e-3 + co.y )*vec3(8.1e5, 1.0e5, 0.1e5) );
	vec3 c = mix(a, b, 0.5);
	return c;
}


void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = 2. * fragCoord.xy / iResolution.xy - 1.;
	vec2 uvs = uv * iResolution.xy / max(iResolution.x, iResolution.y);
	vec3 p = vec3(uvs / 4., 0) + vec3(1., -1.3, 0.);
	p += .2 * vec3(sin(iGlobalTime / 16.), sin(iGlobalTime / 12.),  sin(iGlobalTime / 128.));
	
	float freqs[4];
	//Sound
	freqs[0] = freq1;
	freqs[1] = freq2;
	freqs[2] = freq3;
	freqs[3] = freq4;
	
	float t = field(p,freqs[2]);
	float v = (1. - exp((abs(uv.x) - 1.) * 6.)) * (1. - exp((abs(uv.y) - 1.) * 6.));
	
    //Second Layer
	vec3 p2 = vec3(uvs / (4.+sin(iGlobalTime*0.11)*0.2+0.2+sin(iGlobalTime*0.15)*0.3+0.4), 1.5) + vec3(2., -1.3, -1.);
	p2 += 0.25 * vec3(sin(iGlobalTime / 16.), sin(iGlobalTime / 12.),  sin(iGlobalTime / 128.));
	float t2 = field2(p2,freqs[3]);
	vec4 c2 = mix(.4, 1., v) * vec4(1.3 * t2 * t2 * t2 ,1.8  * t2 * t2 , t2* freqs[0], t2);
	
	
	//Let's add some stars
	//Thanks to http://glsl.heroku.com/e#6904.0
	vec2 seed = p.xy * 2.0;	
	seed = floor(seed * iResolution.x);
	vec3 rnd = nrand3( seed );
	vec4 starcolor = vec4(pow(rnd.y,40.0));
	
	//Second Layer
	vec2 seed2 = p2.xy * 2.0;
	seed2 = floor(seed2 * iResolution.x);
	vec3 rnd2 = nrand3( seed2 );
	starcolor += vec4(pow(rnd2.y,40.0));
	
	fragColor = mix(freqs[3]-.3, 1., v) * vec4(1.5*freqs[2] * t * t* t , 1.2*freqs[1] * t * t, freqs[3]*t, 1.0)+c2;
	
	if (HideStars==0.0)
		fragColor += starcolor;
	
	//alpha blend
	vec2 imgCoord = fragCoord.xy / iResolution.xy;
	if( iChannel0ar > myAr ) {
		imgCoord.y *= iChannel0ar/myAr;
		//imgCoord.x += .5 * ( 1. - myAr / iChannel0ar );
	}

	if( iChannel0ar < myAr ) {
		imgCoord.x *= myAr/iChannel0ar;
		//imgCoord.y += .5 * ( 1. - iChannel0ar / myAr );
	}
	vec4 imgCol = texture2D(iChannel0,imgCoord).rgba;
	if (imgCol.a > 0.0)
	{
		float alpha = fragColor.a * (fragColor.r+fragColor.g+fragColor.b)/3.0;
		fragColor = v*alpha * fragColor + (1.0-alpha)*imgCol*v;
	}
}

//main image wrapper

void main( void )
{
	vec2 p = gl_FragCoord.xy;
	vec4 mycol = vec4(4.0,3.0,0.0,0.0);
	mainImage(mycol, p);
	gl_FragColor = mycol;
}