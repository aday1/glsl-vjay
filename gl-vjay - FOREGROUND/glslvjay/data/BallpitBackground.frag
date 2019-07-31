#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
const float n_circles = 80.;
const float max_radius = .15;
const float min_radius = .1;
const float seed1 = 69.7;
const float seed2 = 82.4;
const float seed3 = 62.5;

uniform float FX1;
uniform float freq1;
uniform float freq2;
uniform float freq3;
uniform float freq4;



float rand(float x, float seed) {
    return fract(sin(x) * seed);
}

float randFromTo(float x, float seed, float min, float max){
    return rand(x, seed) * (max - min) + min;
}

bool drawCircle(vec2 pos, vec2 center, float radius, inout vec3 color) {
    vec2 translatedCenter = vec2(sin(time) * randFromTo(center.x, seed1, -1.8, 1.8) + center.x, sin(time) * randFromTo(center.y, seed1, -1., 1.) + center.y);
    float distance = distance(pos, translatedCenter);
    bool ret =  distance <= radius;
    if (ret) {
        float m = max (0.0, smoothstep(radius, radius / 9., distance));
        color = vec3(abs(freq4) * m, abs(freq3) * m, abs(freq2 - freq1) * m);
    }
    return ret;
}

bool drawCircleOnMousePosition(float minRes, vec2 pos, float radiusMultiplier, inout vec3 color) {
    vec2 mousePosition = (mouse * resolution * 2. - resolution) / minRes;
    return drawCircle(pos, mousePosition, .1 * radiusMultiplier, color);
}

void drawCircles(vec2 pos, float radiusMultiplier, inout vec3 color) {
    for (float i=0.; i<n_circles; i++){
        if (drawCircle(pos, vec2(randFromTo(i, seed1, -7.8, 7.8), randFromTo(i, seed2, -1., 1.)), randFromTo(i, seed3, min_radius, max_radius) * radiusMultiplier, color)) {
            break;
        }
    }
}

void main( void ) {
    float minRes = min(resolution.x, resolution.y);
    vec2 pos = (gl_FragCoord.xy * 2. - resolution) / minRes;
    float radiusMultiplier = abs((FX1 - 1.0)); // SIZE
    vec3 color = vec3(freq1, 0.1, 0.2);
    //if (drawCircleOnMousePosition(minRes, pos, radiusMultiplier, color) == false) {
        drawCircles(pos, radiusMultiplier, color);
    //}
    gl_FragColor = vec4(color, 2);
}

