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

uniform float Move1;
uniform float Move2;
uniform float Move3;
uniform float Move4Step;







#define PHI         ((sqrt(5.)+1.)*.5)
#define TAU         (8.*atan(1.))

#define LEFT_DISPLAY_WIDTH .15

#define TARGET_RANGE    12.
#define VIEW_X      (normalize(vec3( 1., -.001,  .0)) * TARGET_RANGE)
#define VIEW_Y      (normalize(vec3(.0,   1., -.001)) * TARGET_RANGE)
#define VIEW_Z      (normalize(vec3(.0001, 0.,  -1.)) * TARGET_RANGE)
#define VIEW_PHI    (normalize(vec3(1.,1., 1.)) * TARGET_RANGE)
#define VIEW_ORBIT      (normalize(vec3(3.*sin((Move2-.5)*2.*TAU), -3.*atan((Move1-.5) * TAU)*2., 3.*cos((Move3-.5)*2.*TAU+TAU*.5))) * -TARGET_RANGE) //orbit cam
#define VIEW_ORIGIN     (Move4Step < LEFT_DISPLAY_WIDTH ? (Move1 < .75 ? (5.0 < .5 ? (FX4 < .25 ? VIEW_Z : VIEW_Y) : VIEW_X) : VIEW_PHI) : VIEW_ORBIT)

#define ANIMATE_PATH
#define ANIMATE_DIMENSION
//#define COMPLETE_LATTICE
//#define SHOW_BINARY


float rcp(float x)
{
    return x == 0. ? x : 1./x;  
}

float binary(float n, float e)
{
    return n/exp2(e+1.);
}


float gray(float n, float e)
{
    return binary(n,e+1.)+.25;
}


float step_bit(float b)
{
    return step(.5, fract(b));
}

vec3 h46cube(float i)
{   
    //135024
    float x = step_bit(gray(i, 1.));
    float y = step_bit(gray(i, 2.));
    float z = step_bit(gray(i, 3.));
    float u = step_bit(gray(i, 4.));
    float v = step_bit(gray(i, 5.));
    float w = step_bit(gray(i, 0.));
    
    #ifdef ANIMATE_DIMENSION
    float t = mod(time * .7, 10.)-5.;
    float l = t > 0. ? fract(t) : fract(1.-t);  
    t   = abs(t);


    float p = t < 1. ? 0.
        : t < 2. ? mix(0., 1., l)
        : t < 3. ? 1.
        : t < 4. ? mix(1., PHI, l)
        : PHI;
    #else
    float p = Move3 < .6 
        ? mouse.x < .3 
        ? 0. : 1. : PHI;
    #endif
    
    return vec3(x * p - u * p + y + v, 
            y * p - v * p + z + w, 
            z * p - w * p + x + u) - 1.;
}

vec3 hsv(in float h, in float s, in float v)
{
        return mix(vec3(1.),clamp((abs(fract(h+vec3(3.,2.,1.)/3.)*6.-3.)-1.),0.,1.),s)*v;
}


float contour(float x, float r)
{
    return 1.-clamp(x*128., 0., 1.);
}



float edge(vec2 p, vec2 a, vec2 b)
{
    vec2 q  = b - a;    
    float u = dot(p - a, q)/dot(q, q);
    u   = clamp(u, 0., 1.);

    return distance(p, mix(a, b, u));
}


float line(vec2 p, vec2 a, vec2 b, float r)
{
    vec2 q  = b - a;    
    float u = dot(p - a, q)/dot(q, q);
    u   = clamp(u, 0., 1.);

    return contour(edge(p, a, b), r);
}


mat2 rmat(float t)
{
    float c = cos(t);
    float s = sin(t);
    return mat2(c, s, -s, c);
}



mat3 projection_matrix(in vec3 origin, in vec3 target) 
{   
    vec3 w              = normalize(origin-target);
    vec3 u              = normalize(cross(w,vec3(0.,1.,0.)));
    vec3 v              = -normalize(cross(u,w));
    return mat3(u, v, w);
}


mat3 phack;
vec3 project(vec3 origin, vec3 v)
{
    v   -= origin;
    v   *= phack*1.0;   
    v.z     = v.z-1.;   
    
    if(gl_FragCoord.x < LEFT_DISPLAY_WIDTH * resolution.x)
    {
        v.xy *= rcp(TARGET_RANGE+.5);
    }
    else
    {
        if(Move2 < LEFT_DISPLAY_WIDTH)
        {
            v.xy *= rcp(TARGET_RANGE);
        }
        else
        {
            v.xy *= rcp(v.z-1.);
        }
    }
    
    return v;
}

float fold(float i)
{
    return i;
}


float icosahedron(vec3 p, float r)
{
    vec4 q  = (vec4(.30901699437, .5, .80901699437, 0.));   
    p   = abs(p);
    return max(max(max(dot(p,q.wxz), dot(p, q.yyy)),dot(p,q.zwx)),dot(p,q.xzw))-r+(PHI-1.);
}


float dodecahedron(vec3 p, float r)
{
    vec3 q  = normalize(vec3(0., .5,.80901699437)); 
    p   = abs(p);   
    return max(max(dot(p, q.yxz), dot(p, q.zyx)),dot(p, q.xzy))-r+(PHI-1.);
}

float rhombictriacontahedron(vec3 p, float r)
{
    vec3 q = vec3(.30901699437, .5,.80901699437);   
    p = abs(p); 
    return  max(max(max(max(max(p.x, p.y), p.z), dot(p, q.zxy)), dot(p, q.xyz)), dot(p, q.yzx)) - r;
}


float trucatedicosahedron(vec3 p, float r)
{
    vec4 q  = vec4(.30901699437, .5,.80901699437, 0.);  
    //p = abs(p);
    float d = 0.;

    p   = abs(p);
    d   = max(max(max(max(max(p.x, p.y), p.z), dot(p, q.zxy)), dot(p, q.xyz)), dot(p, q.yzx));  
    d   = max(max(max(dot(p, q.ywz), dot(p, q.zyw)),dot(p, q.wzy)), d - .125);          
    d   -= r - .125;
    return  d;
}

void main( void ) 
{
    vec2 aspect         = resolution.xy/min(resolution.x, resolution.y);
    vec2 uv             = gl_FragCoord.xy/resolution.xy;
    
    bool left_display_panels    = uv.x < LEFT_DISPLAY_WIDTH; 
    bool mouse_on_left      = mouse.x < LEFT_DISPLAY_WIDTH;
    float display_panel     = left_display_panels ? floor(uv.y * 4.) + 1. : 0.;
    vec2 display_uv         = left_display_panels ? fract(uv * vec2(4., 4.)) + vec2(.125, -.0625) : uv;
    
    vec2 p              = (display_uv - .5) * aspect;
    p               += left_display_panels ? .125 : 0.;
    
    vec3 origin         = display_panel == 0. ? VIEW_ORIGIN : 
                      display_panel == 1. ? VIEW_Z : 
                      display_panel == 2. ? VIEW_Y : 
                      display_panel == 3. ? VIEW_X : 
                          VIEW_PHI;
    
    vec3 view_position      = origin;
    vec3 target         = vec3(0., 0., 0.);
    
    mat3 projection         = projection_matrix(vec3(0.,0.,0.), origin);
    phack               = projection;
    vec3 view           = normalize(vec3(p, 1.61));

    float x             = floor((1.-uv.x)*64.+1.);  
    float y             = floor(uv.y*64.);  
    y               = fold(y);

    
    float bits          = step_bit(gray(y*2., x));
    
    float width         = 1.;
    vec3 path           = vec3(0., 0., 0.);
    vec3 vertex[2];
    vertex[0]           = h46cube(fold(63.));
    vertex[1]           = h46cube(fold(0.));
    
    vec3 axis[8];
    
    vec3 v_projection[16];
    axis[0]         = vec3(  1.,  1.,  1.);
    axis[1]         = vec3(  1.,  1., -1.);
    axis[2]         = vec3(  1., -1.,  1.); 
    axis[3]         = vec3( -1.,  1.,  1.); 
    axis[4]         = vec3( -1., -1.,  1.);
    axis[5]         = vec3(  1., -1., -1.);
    axis[6]         = vec3( -1.,  1., -1.);
    axis[7]         = vec3( -1., -1., -1.); 
    
    for(int i = 0; i < 8; i++)
    {

        v_projection[i]     = project(origin, axis[i] * vertex[0]);
    }

    
    float v_weight[8];
    path                += bits * .0125;
    #ifdef ANIMATE_PATH
    float animation_speed       = 15.;
    float animation_step        = time * animation_speed;
    float cutoff            = mod(animation_step, 128.);
    bool reverse            = cutoff > 64.;
    float animation_interpolant = reverse ? fract(1.-animation_step) : fract(animation_step) ;
    cutoff              = abs(cutoff-64.);
    
    if(mod(animation_step, 256.) > 128.)
    {
        cutoff          = 64.;
        animation_interpolant   = 1.;
    }
    #else
    float animation_speed       = 1.;
    float animation_step        = 65.;
    float cutoff            = 65.;
    float animation_interpolant = 1.;
    #endif
    
    float id_print          = 0.;   
    vec3 bit_hue            = vec3(0., 0., 0.);
    vec3 bit_display        = vec3(0., 0., 0.);
    float v             = 0.;
    for(float i = 0.; i < 64.; i++)
    {           
        v               = fold(i);

        vertex[0]           = h46cube(v);
        
            
        bool last_vert          = v == floor(cutoff);   

        float saturation        = float(v < cutoff) - float(last_vert) * animation_interpolant;
        float brightness        = v < cutoff ? 1. : .5;
        vec3 color          = hsv(floor(v) * rcp(64.), saturation, brightness);

        
        #ifdef SHOW_BINARY
        if(i == y)
        {
            bit_display     = max(bit_display, bits * color);
        }
        #endif  

        float l             = 0.;
        #ifdef COMPLETE_LATTICE
        for(int j = 0; j < 8; j++)
        #else
        for(int j = 0; j < 1; j++)
        #endif
        {
            
            v_projection[j+8]   = v_projection[j];
            v_projection[j]     = project(origin, axis[j] * vertex[0]);
            v_weight[j]     = rcp(max(v_projection[j].z, v_projection[j+8].z));         
            l           = max(l, line(view.xy, v_projection[j].xy,  v_projection[j+8].xy, v_weight[j]) * v_weight[j]);              
        }

        l           = pow(l, 4.);
        l           *= 8192.;
        path            = max(path, clamp(l * vec3(1.,1.,1.), 0., 1.));
        
        if(v < cutoff)
        {
            l           = 0.;
            if(last_vert)
            {
                vec3 c_vert_a   = project(origin, vertex[1]);

                vec3 c_vert_b   = mix(vertex[0], vertex[1], animation_interpolant);         
                c_vert_b    = project(origin, c_vert_b);
                float c_weight  = rcp(max(c_vert_a.z, c_vert_b.z));
                l       = line(view.xy, c_vert_a.xy, c_vert_b.xy, c_weight) * c_weight * 2.;
            }
            else
            {
                l       = line(view.xy, v_projection[0].xy,  v_projection[8].xy, v_weight[0]) * v_weight[0] * 2.;           

            }

            l       = pow(l, 4.);
            l       *= 1024.;
            path        = max(path, l * color);             
        
        }

        
        vertex[1]       = vertex[0];            
    }
        
    vec3 result         = vec3(0., 0., 0.); 
    #ifdef SHOW_BINARY
    result          += bit_display * .75;
    #endif 
    result          += path;
    result          = pow(result, freq1 * 5.0 * vec3(1., 1., 1.)); // Line Depth Debug
    
    gl_FragColor.xyz    = result;
    gl_FragColor.w      = 1.;
}//sphinx