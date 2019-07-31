#ifdef GL_ES
precision mediump float;
#endif


#define PROCESSING_COLOR_SHADER;

#define PI 3.141592653589793
#define FAR 10.0
#define RAYSTEP 99
#define PHANTOM_MODE

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


vec3 trans(vec3 p, float interbal){
    return mod(p, interbal) - interbal / 2.0;
}

mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c,s,-s,c);
}

vec2 pmod(vec2 p, float r) {
    float a =  atan(p.x, p.y) + PI/r;
    float n = PI * 2.0 / r;
    a = floor(a/n)*n;
    return p*rot(-a);
}

// Linear interpolation for scalarsd
float lerp(float a, float b, float i) {
    if (i < 1.0) i += 1.0; // lerp(i = -0.2) == lerp(i = 0.8)dasd
    return a * (1.0 - i) + b * i;
}

// Linear interpolation for vectors
vec3 lerp(vec3 a, vec3 b, float i) {
    if (i < 0.0) i += 1.0; // lerp(i = -0.1) == lerp(i = 0.8)
    return a * (1.0 - i) + b * i;
}

vec3 hsv( float h, float s, float v){
    return ((clamp(abs(fract(h+vec3(5,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*s+1.)*v;
}

vec3 rotate(vec3 p, float angle, vec3 axis){
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    mat3 m = mat3(
        a.x * a.x * r + c,
        a.y * a.x * r + a.z * s,
        a.z * a.x * r - a.y * s,
        a.x * a.y * r - a.z * s,
        a.y * a.y * r + c,
        a.z * a.y * r + a.x * s,
        a.x * a.z * r + a.y * s,
        a.y * a.z * r - a.x * s,
        a.z * a.z * r + c
    );
    return m * p;
}

float random (in vec2 st) { 
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float sdPlane( vec3 p )
{
    float d = p.y;
    return d;
}
float sdRoad( vec3 p ){
    float d = p.y;
    d = max(d, abs(sin(p.z * 0.3) * 0.8 + p.x) - 0.4);
    return d;
}

float sdSphere(vec3 p, float r) {
    float d = length(p) - r;
    return d;
}

float sdSphereMod( vec3 p, float r )
{
    p = trans(p, 10.0);
    return sdSphere(p, r);
}

float sdBox( vec3 p, vec3 b )
{
    vec3 d = abs(p) - b;
    return length(max(d,0.0)) + min(max(d.x,max(d.y,d.z)),0.0);
}
float sdBoxMod( vec3 p, vec3 b )
{
    p = trans(p, 5.0);
    return sdBox( p, b );
}

float sdTorus( vec3 p, vec2 t )
{
    vec2 q = vec2(length(p.xz)-t.x,p.y);
    return length(q)-t.y;
}

float sdTorusMod( vec3 p, vec2 t){
    p.y = mod(p.y, 10.0) - 5.0;
    return sdTorus(p, t);
}

float sdHexPrism( vec3 p, vec2 h )
{
    const vec3 k = vec3(-0.8660254, 0.5, 0.57735);
    p = abs(p);
    p.xy -= 1.2*min(dot(k.xy, p.xy), 0.0)*k.xy;
    vec2 d = vec2(
    length(p.xy-vec2(clamp(p.x,-k.z*h.x,k.z*h.x), h.x))*sign(p.y-h.x),
    p.z-h.y );
    return min(max(d.x,d.y),0.0) + length(max(d,1.0));
}

float sdHexPrismMod( vec3 p, vec2 h )
{
    p.z = abs(mod(p.z, 0.4) - 4.0);
    return sdHexPrism(p, h);
}

float sdCappedCylinder( vec3 p, vec2 h )
{
    vec2 d = abs(vec2(length(p.xz),p.y)) - h;
    return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}

//pixel effect
vec2 pixelate( vec2 p, float pixelRes ){
    p = floor(p * min(resolution.x, resolution.y) / pixelRes) * pixelRes / min(resolution.x, resolution.y);
    return p;
}

float map( vec3 p){
    float speed = 16.0;
    float dist = 1.0;
    //dist = min(dist, sdBoxMod(rotate(rayPos, time/10.0, vec3(1.0)) - vec3(0.0, 0.0, 0.0 - time * speed/2.0), vec3(0.3)));
    dist = min(dist, sdBoxMod(p - vec3(5.0, 0.0, 0.0 ), vec3(3.0, 2.0, 1.0)));
    //dist = min(dist, sdTorusMod(rotate(rayPos, PI/2.0, vec3(1.0, 0.0, 0.0)) - vec3(0.0, 0.0 + time * speed/2.0, 0.0), vec2(2.0, 0.15)));
    
    dist = min(dist, sdSphereMod(p - vec3(1.0, 1.0, 0.0), 0.08));
    dist = max(dist, -sdHexPrismMod(p - vec3(0.0, 0.0, 0.0), vec2(2.0, 0.0)));
    dist = min(dist, sdHexPrismMod(p - vec3(0.0, 0.0, 5.0 ), vec2(0.1, 1.0)));
    dist = max(dist, -sdHexPrismMod(p - vec3(0.0, 0.0, 0.0 ), vec2(2.5 - 0.2, 10.0)));
    
    

    dist = min(dist, sdSphere(p, freq2 * 5));
    dist = min(dist, sdTorus(rotate(p, PI/5.0 * sin(time/2.0), vec3(sin(time)*0.5, 0.0, 1.0)), vec2(FX1 * 5, freq1)));
    
    for(int i=0; i<2; i++) {
        p = abs(p);
        p.xz *= rot(time*-1.0);
        p.xy *= rot(time*0.87);
    }
    
    return dist;
}

void main( void ) {
    vec2 p = ( gl_FragCoord.xy * 2. - resolution.xy ) / min(resolution.x, resolution.y);
    
    
    
    vec3 cameraPos = vec3(0.,0.,-10.);
    float screenZ = 2.0;
    vec3 rayDirection = normalize(vec3(p, screenZ));
    
    vec3 bgColor = vec3(0.0);
    vec3 nearColor = vec3(0.3, 1.0, 0.9);
    
    float depth = 0.0;
    vec3 col = bgColor;
    for (int i = 0; i < RAYSTEP; i++) {
        vec3 rayPos = cameraPos + rayDirection * depth;
        float dist = map(rayPos);
        float dAmount = clamp(depth/FAR, 0.0, 1.0);
#ifdef PHANTOM_MODE 
        // transparent
        dist = max(abs(dist), 0.001);
        //col += lerp(nearColor, bgColor, clamp(depth / FAR - 0.0, 0.0, 1.0)) / float(RAYSTEP);
        col += hsv(-dAmount + freq3, 0.7 + (2.9 - dAmount) * 0.1, mod(depth-freq4*-FX3,5.5)/3.0) / float(RAYSTEP);
#else
        // opaque
        if (dist < 0.001) {
            col = lerp(nearColor, bgColor, clamp(depth / FAR - 0.0, 0.0, 1.0));
            break;
        }
#endif
        depth += dist;
    }
    
    col += vec3(sdSphere(vec3(p, 4.0), 0.0) * 0.1, -0.0, 0.0);

    float colorRes = 0.5;
    vec3 step_col = floor(col * colorRes) / colorRes;
    col = lerp(col, step_col, smoothstep( -0.0, -0.0, sin(time/0.0)));
    
    col = pow(col, vec3(4.5));
    gl_FragColor = vec4(col, 1.0);
}