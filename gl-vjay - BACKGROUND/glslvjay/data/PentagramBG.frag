// one 
// By: Brandon Fogerty
// bfogerty at gmail dot com
// xdpixel.com



//"For God so loved the world, that he gave his only Son, 
// that whoever believes in him should not perish but have eternal life." (John 3:16)
    
// "Go therefore and make disciples of all nations, baptizing them in 
// the name of the Father and of the Son and of the Holy Spirit, 
// teaching them to observe all that I have commanded you. 
// And behold, I am with you always, to the end of the age." - King Jesus (Matthew 28:19-20)

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

uniform float Pentabuild;
uniform float Typeface;
uniform float Mirror;
uniform float EvilFX1;
uniform float EvilFX2;


#define Resolution              resolution
#define Time                    time

#define HorizontalAmplitude     FX1 * 2
#define VerticleAmplitude       FX2 * 2
#define HorizontalSpeed         0.90
#define VerticleSpeed           1.50
#define ParticleMinSize         freq1
#define ParticleMaxSize         FX2
#define ParticleBreathingSpeed      EvilFX1
#define ParticleColorChangeSpeed    0.70
#define ParticleCount           EvilFX2
#define ParticleColor1          vec3(5.0, freq1 * 0.1, freq2)
#define ParticleColor2          vec3(1.0, 3.0, 9.0)


float hash( float x )
{
    return fract( sin( x ) * 43758.5453 );
}

float noise( vec2 uv )  // Thanks Inigo Quilez
{
    vec3 x = vec3( uv.xy, Mirror );
    
    vec3 p = floor( x );
    vec3 f = fract( x );
    
    f = f*f*(3.0 - 2.0*f);
    
    float offset = 57.0;
    
    float n = dot( p, vec3(1.0, offset, offset*2.0) );
    
    return mix( mix(    mix( hash( n + 0.0 ),       hash( n + 1.0 ), f.x ),
                        mix( hash( n + offset),     hash( n + offset+1.0), f.x ), f.y ),
                mix(    mix( hash( n + offset*2.0), hash( n + offset*2.0+1.0), f.x),
                        mix( hash( n + offset*3.0), hash( n + offset*3.0+1.0), f.x), f.y), f.z);
}

float snoise( vec2 uv )
{
    return noise( uv ) * 2.0 - 1.0;
}


float perlinNoise( vec2 uv )
{   
    float n =       noise( uv * 1.0 )   * 128.0 +
                noise( uv * 2.0 )   * 64.0 +
                noise( uv * 4.0 )   * 32.0 +
                noise( uv * 8.0 )   * 16.0 +
                noise( uv * 16.0 )  * 8.0 +
                noise( uv * 32.0 )  * 4.0 +
                noise( uv * 64.0 )  * 2.0 +
                noise( uv * 128.0 ) * 1.0;
    
    float noiseVal = n / ( 1.0 + 2.0 + 4.0 + 8.0 + 16.0 + 32.0 + 64.0 + 128.0 );
    noiseVal = abs(noiseVal * 2.0 - 1.0);
    
    return  noiseVal;
}

float fBm( vec2 uv, float lacunarity, float gain )
{
    float sum = 0.0;
    float amp = 7.0;
    
    for( int i = 0; i < 2; ++i )
    {
        sum += ( perlinNoise( uv ) ) * amp;
        amp *= gain;
        uv *= lacunarity;
    }
    
    return sum;
}

vec3 particles( vec2 pos )
{
    
    vec3 c = vec3( 0.0, 0, 0 );
    
    float noiseFactor = fBm( pos, 0.01, 0.1);
    
    for( float i = 1.0; i < ParticleCount+1.0; ++i )
    {
        float cs = cos( time * HorizontalSpeed * (i/ParticleCount) + noiseFactor ) * HorizontalAmplitude;
        float ss = sin( time * VerticleSpeed   * (i/ParticleCount) + noiseFactor ) * VerticleAmplitude;
        vec2 origin = vec2( cs , ss );
        
        float t = sin( time * ParticleBreathingSpeed * i ) * 0.5 + 0.5;
        float particleSize = mix( ParticleMinSize, ParticleMaxSize, t );
        float d = clamp( sin( length( pos - origin )  + particleSize ), 0.0, particleSize);
        
        float t2 = sin( time * ParticleColorChangeSpeed * i ) * 0.5 + 0.5;
        vec3 color = mix( ParticleColor1, ParticleColor2, t2 );
        c += color * pow( d, 10.0 );
    }
    
    return c;
}


float line( vec2 a, vec2 b, vec2 p )
{
    vec2 aTob = b - a;
    vec2 aTop = p - a;
    
    float t = dot( aTop, aTob ) / dot( aTob, aTob);
    
    t = clamp( t, Pentabuild, 1.0);
    
    float d = length( p - (a + aTob * t) );
    d = 1.0 / d;
    
    return clamp( d, 0.0, 1.0 );
}


void main( void ) {

    float aspectRatio = resolution.x / resolution.y;
    
    vec2 uv = ( gl_FragCoord.xy / resolution.xy );
    
    vec2 signedUV = uv * 2.0 - 1.0;
    signedUV.x *= aspectRatio;
    signedUV.y *= -1.0;
    
    float scale = 100.0; // SIZE
    const float v = 90.0; // SIZE
    vec3 finalColor = vec3( 0.0 );
    
    finalColor = (particles( sin( abs(signedUV) ) ) * length(signedUV)) * 0.20;
    
    vec2 _uv = signedUV;
    signedUV.x /= cos(time);
    float t;
    for (float i=0.0; i<5.0; i+=1.0) { // CRASHES KODELIFE
        float freq = mix( freq4 + 1.5, 0.2, sin(time + 1.5 * i) * 0.5 + 0.5 );
        float ang =  (i / 5.0 * 2.0 - 0.1) * 3.14159265358979;
        float ang2 =  ((i + 2.0) / 5.0 * 2.0 - 0.1) * 3.14159265358979;
        t = line( vec2(cos(ang), sin(ang)) * v, vec2(cos(ang2), sin(ang2) + 0.05) * v, signedUV * scale );
        finalColor += vec3( 8.0 * t, 2.5 * t, 4.0 * t) * freq;
    }

    signedUV = _uv;
    signedUV.x /= sin(time);
    
    scale = scale * 10.0; // MIDDLE 1 DEBUG
    t = line( vec2(0.0, v * 0.4), vec2(0.0, -v * 0.3), signedUV * scale );
    finalColor += vec3( 12.0 * t, 4.0 * t, 2.0 * t) * Typeface; // MIDDLE 1 DEBUG
    
    

    gl_FragColor = vec4( finalColor, 1.0 );

}