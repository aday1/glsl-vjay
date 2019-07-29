/*
 * Original shader from: https://www.shadertoy.com/view/WlfXW4
 */
#define PROCESSING_COLOR_SHADER;

#ifdef GL_ES
precision mediump float;
#endif

// glslsandbox uniforms
uniform float time;
uniform vec2 resolution;

// shadertoy emulation
#define iTime time
#define iResolution resolution

// --------[ Original ShaderToy begins here ]---------- //
#define rotate(a) mat2(cos(a),sin(a),-sin(a),cos(a))

float g = 0.0;

float deCauliflower(vec3 p, vec3 s, float r, float t)
{    
    for (int i=0;i<6;i++){
        p = abs(p)-s;
        mat2 m = rotate(sin(t*0.8+0.3*sin(t))*2.0+0.8);
        p.xy *= m;
        p.yz *= m;
        s *= 0.7;
    }
    p = abs(p)-s;
    if (p.x < p.z) p.xz = p.zx;
    if (p.y < p.z) p.yz = p.zy;        
    p.z = max(0.0,p.z);
    return length(p)-r;
 }

float map(vec3 p)
{
    float de = deCauliflower(p,vec3(4.5),0.01,iTime);
    g += 0.1/(0.3+de*de*10.0); // Distance glow by balkhan
    return deCauliflower(p,vec3(4.5),0.06,iTime+0.3);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord*2.0-iResolution.xy)/iResolution.y;
    vec3 ro = vec3(0.0, 0.0, 25.0+sin(iTime*0.8+sin(iTime*0.5)*0.8)*5.0);
    ro.xz *= rotate(iTime*0.3);
    ro.xy *= rotate(iTime*0.5);
    vec3 w = normalize(-ro);
    vec3 u = normalize(cross(w,vec3(0,1,0)));
    vec3 rd = mat3(u,cross(u,w),w)*normalize(vec3(uv, 3));
    vec3 col = vec3(0.05);
    float t = 0.0, d;
    for(int i = 0; i < 64; i++)
    {
        t += d = min(map(ro + rd * t),1.0);
        if(d < 0.001) break;
    }
    col += vec3(0.0,0.7,0.3)*g*0.25;
    col = clamp(col,0.0,1.0);
    fragColor = vec4(col, 1);
}
// --------[ Original ShaderToy ends here ]---------- //

void main(void)
{
    mainImage(gl_FragColor, gl_FragCoord.xy);
}