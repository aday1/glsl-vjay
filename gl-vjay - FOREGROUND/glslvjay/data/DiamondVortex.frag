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
uniform float FX3;
uniform float FX4;

uniform float COL1;
uniform float COL2;
uniform float COL3;




float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }

float sdRhombus( in vec2 p, in vec2 b ) 
{
    vec2 q = abs(p);

    float h = clamp( (-2.0*ndot(q,b) + ndot(b,b) )/dot(b,b), -FX4, 1.0 );
    float d = length( q - 0.5*b*vec2(1.0-h,1.0+h) );
    d *= sign( q.x*b.y + q.y*b.x - b.x*b.y );
    
	return d;
}

void main( void ) {

	
	vec2 p = (2.0*gl_FragCoord.xy - resolution.xy) / resolution.y;

	vec2 ra = FX1 + 0.3*cos( time + vec2(freq1,1.57) + 0.0 );

	float d = sdRhombus( p, ra );

        vec3 col = vec3(1.0) - sign(d)*vec3(freq1,freq2,COL2);
	col *= COL3 - exp(-1.0*abs(d));
	col *= 1.3 + FX2*cos(10.0*d);
	col = mix( col, vec3(1.0), FX3-smoothstep(0.1,COL3,abs(d)) );

	gl_FragColor = vec4(col,1.0);

}