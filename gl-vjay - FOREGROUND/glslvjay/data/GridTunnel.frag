/*
 * Original shader from: https://www.shadertoy.com/view/ttjGDK
 */

#ifdef GL_ES
precision mediump float;
#endif
#define PROCESSING_COLOR_SHADER

// glslsandbox uniforms
uniform float time;
uniform vec2 resolution;

uniform float FX1;
uniform float FX2;
uniform float FX3;
uniform float FX4;

uniform float freq1;
uniform float freq2;
uniform float freq3;
uniform float freq4;





// shadertoy emulation
#define iTime time
#define iResolution resolution

// --------[ Original ShaderToy begins here ]---------- //
precision highp float;

mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c,s,-s,c);
}

float box(vec3 p, vec3 b) {
    vec3 d = abs(p) - b;
    return length(max(d, 0.0));
}

float ifsBox(vec3 p) {
    for(int i=0; i<6; i++) {
        p = abs(p) - 1.0;
        p.xz *= rot(.8);
        p.xy *= rot(0.0);
    }
    return box(p, vec3(FX1, FX3, FX3));
}

float map(vec3 p) {
    float c = FX2 * 2.0;
    p.z = mod(p.z, c) - c * 0.5;
    return ifsBox(p);
}

vec3 hsv(float h, float s, float v) {
    return ((clamp(abs(fract(h+vec3(freq3,freq1,5)/5.)*3.-3.)-1.,0.,1.)-1.)*s+1.)*v;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 p = (fragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;

    vec3 cPos = vec3(2.5*sin(0.0*iTime), 0.0*cos(0.3*iTime), -20.0*iTime);
    vec3 cDir = vec3(0.0, 0.0, -1.0);
    vec3 cUp  = vec3(0.0, 1.0, 0.0);
    vec3 cSide = cross(cDir, cUp);

    vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir);

    // Phantom Mode https://www.shadertoy.com/view/MtScWW by aiekick
    float t = 0.0;
    float acc = 0.0;
    for (int i = 0; i < 199; i++){
        vec3 pos = cPos + ray * t;
        float dist = map(pos);

        dist = max(abs(dist), 0.02);
        float a = exp(-dist*3.0);
        if (mod(pos.z-0.0*iTime, 50.0) < 8.0) {
            a *= 5.0;
        }
        acc += a;

        t += dist*0.6;
        if (t > 150.0) break;
    }

    vec3 col = hsv(fract(0.06*iTime), 0.6, acc * 0.01);
    fragColor = vec4(col, 1.0);
}
// --------[ Original ShaderToy ends here ]---------- //

void main(void)
{
    mainImage(gl_FragColor, gl_FragCoord.xy);
}