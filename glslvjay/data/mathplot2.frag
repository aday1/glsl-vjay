#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 resolution;
uniform vec3 mouse;



uniform float freq1;
uniform float freq2;
uniform float freq3;
uniform float freq4;


uniform float ShiftXUP;
uniform float ShiftX;
uniform float ShiftXLineDistance;
uniform float  ShiftXHorizontal;
uniform float  ShiftXX;
uniform float  ShiftXY;


float f(float x)
{ /** you can change the plot function here **/
	return sin(x+time*2.);
}

bool cmp(float a, float b, float epsilon)
{
	return (abs(a-b))<epsilon;
}

void main( void ) {

	vec2 p = gl_FragCoord.xy / resolution.xy * 8.0 - ShiftXUP + -4.0;
	vec2 plot = gl_FragCoord.xy / resolution.xy;

	if(cmp(p.y, f(p.x), 0.09))
		gl_FragColor = vec4(1., 0., freq4, 1.);

	else if (cmp(0.5, plot.x, 0.002) || cmp(0.5, plot.y, 0.004)) gl_FragColor = vec4(0.0, 1.0, freq2, freq1 + 1.0);
	else if(cmp(mod(.5007-plot.x, 0.0625), 0., 0.0014) || cmp(mod(.5007-plot.y, 0.125), 0., 0.003))
	   gl_FragColor = vec4(1.);

	else gl_FragColor = vec4(.0);

}
