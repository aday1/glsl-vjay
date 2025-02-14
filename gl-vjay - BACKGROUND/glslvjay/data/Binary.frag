/*
 * Original shader from: https://www.shadertoy.com/view/4scBW2
 */

#ifdef GL_ES
precision mediump float;
#endif
#define PROCESSING_COLOR_SHADER

// glslsandbox uniforms
uniform float time;
uniform vec2 resolution;
uniform float freq1;
uniform float freq2;
uniform float freq3;
uniform float freq4;

uniform float FX1;

// shadertoy emulation
#define iTime time
#define iResolution resolution

// --------[ Original ShaderToy begins here ]---------- //
//////////////////////////////////////////////////////////////////////////////////
// Infinity Matrix - Copyright 2017 Frank Force
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
//////////////////////////////////////////////////////////////////////////////////

const float zoomSpeed			= 1.0;	// how fast to zoom (negative to zoom out)
const float zoomScale			= 0.1;	// how much to multiply overall zoom (closer to zero zooms in)
const int recursionCount		= 5;	// how deep to recurse
const float recursionFadeDepth	= 2.0;	// how deep to fade out
const int glyphSize				= 5;	// width & height of glyph in pixels
const int glyphCount			= 2;	// how many glyphs total
const float glyphMargin			= 0.5;	// how much to center the glyph in each pixel

int GetGlyphPixel(ivec2 pos, int g)
{
	if (pos.x >= glyphSize || pos.y >= glyphSize)
		return 0;
    
    // get if bit is on for this pixel in the glyph
    // 0x01110, 0x01110, 
	// 0x11011, 0x11110,
	// 0x11011, 0x01110, 
	// 0x11011, 0x01110,
	// 0x01110, 0x11111
	//  0        1
    
    if (g == 0)
    {
     	if (pos.x > 0 && pos.x < 4 && (pos.y == 0 || pos.y == 4))
            return 1;
     	if (pos.y > 0 && pos.y < 4 && pos.x != 2)
            return 1;
  	    return 0;
    }
    else
    {
        if (pos.x == 0 && (pos.y == 4 || pos.y == 2 || pos.y == 1))
            return 0;
        if (pos.x == 4 && pos.y > 0)
            return 0;
        return 1;
    }
    
    return 0;
}

//////////////////////////////////////////////////////////////////////////////////
// Precached values and math

const float glyphSizeF = float(glyphSize) + 2.0*glyphMargin;
const float glyphSizeLog = log(glyphSizeF);
const float gsfi = 1.0 / glyphSizeF;
const float e = 2.718281828459;
const float pi = 3.14159265359;

float RandFloat(int i) { return (fract(sin(float(i)) * 43758.5453)); }
int RandInt(int i) { return int(100000.0*RandFloat(i)); }

//////////////////////////////////////////////////////////////////////////////////
// Color and image manipulation

float GetRecursionFade(int r, float timePercent)
{
    if (r > recursionCount)
        return timePercent;
    
    // fade in and out recusion
    float rt = max(float(r) - timePercent - recursionFadeDepth, 0.0);
    float rc = float(recursionCount) - recursionFadeDepth;
    return rt / rc;
}

vec3 InitPixelColor() { return vec3(0); }
vec3 CombinePixelColor(vec3 color, float timePercent, int i, int r, vec2 pos, ivec2 glyphPos, ivec2 glyphPosLast)
{
    vec3 myColor = vec3(1.0);
        
    myColor.r *= mix(3.3, freq3, RandFloat(i + r + 11*glyphPosLast.x + 13*glyphPosLast.y));
    myColor.b *= mix(freq2, freq1, RandFloat(i + r + 17*glyphPosLast.x + 19*glyphPosLast.y));
    myColor *= mix(0.2, 0.7, RandFloat(i + r + 31*glyphPosLast.x + 37*glyphPosLast.y));

    // combine with my color
    float f = GetRecursionFade(r, timePercent);
    color += myColor*f;
    return color;
}

vec3 FinishPixel(vec3 color, vec2 uv)
{
    // brighten
    color += vec3(0.05);
    
    // make a color
    color *= vec3(0.4, 1.4, 0.7);
    return color;
}

vec2 InitUV(vec2 uv)
{
	// wave
	uv.x += FX1*sin(1.0*uv.y + 1.0*iTime);
	uv.y += freq2*sin(1.0*uv.x + 0.8*iTime);
    return uv;
}


//////////////////////////////////////////////////////////////////////////////////
// Fractal functions

int imod(int a, int b) { return int(mod(float(a), float(b))); }
int GetFocusGlyph(int i) { return imod(RandInt(i), glyphCount); }

ivec2 CalculateFocusPos(int iterations)
{
    // count valid pixels in glyph
    int g = GetFocusGlyph(iterations-1);
    int c = 18;	// OPT - 1 and 0 glyps both have 18 pixels

    // find a random valid pixel in glyph
    c -= imod(RandInt(iterations), c);
    for (int y = 0; y < glyphSize; ++y)
    for (int x = 0; x < glyphSize; ++x)
    {
            c -= GetGlyphPixel(ivec2(x, y), g);
            if (c == 0)
                return ivec2(x, y);
    }
    
    return ivec2(0);
}
  
ivec2 GetFocusPos(int i) { return CalculateFocusPos(i); }

int GetGlyph(int iterations, ivec2 glyphPos, int glyphLast, ivec2 glyphPosLast, ivec2 focusPos)
{ 
    if (glyphPos == focusPos)
        return GetFocusGlyph(iterations); // inject correct glyph     
            
    int seed = iterations + glyphPos.x * 313 + glyphPos.y * 411 + glyphPosLast.x * 557 + glyphPosLast.y * 121;
    return imod(RandInt(seed), glyphCount); 
}
      
// get color of pos, where pos is 0-1 point in the glyph
vec3 GetPixelFractal(vec2 pos, int iterations, float timePercent)
{
    int glyphLast = GetFocusGlyph(iterations-1);
	ivec2 glyphPosLast = GetFocusPos(iterations-2);
	ivec2 glyphPos =     GetFocusPos(iterations-1);
    
	bool isFocus = true;
    ivec2 focusPos = glyphPos;
    
	vec3 color = InitPixelColor();
	for (int r = 0; r <= recursionCount + 1; ++r)
	{
        color = CombinePixelColor(color, timePercent, iterations, r, pos, glyphPos, glyphPosLast);
        
        //if (r == 1 && glyphPos == GetFocusPos(r-1))
	    //    color.z = 1.0; // debug - show focus
        
        if (r > recursionCount)
			return color;
           
        // update pos
        pos -= vec2(glyphMargin*gsfi);
        pos *= glyphSizeF;

        // get glyph and pos within that glyph
        glyphPosLast = glyphPos;
        glyphPos = ivec2(pos);

        // check pixel
        int glyphValue = GetGlyphPixel(glyphPos, glyphLast);
		if (glyphValue == 0 || pos.x < 0.0 || pos.y < 0.0)
			return color;
        
        // next glyph
		pos -= vec2(floor(pos));
        focusPos = isFocus? GetFocusPos(iterations+r) : ivec2(-10);
        glyphLast = GetGlyph(iterations + r, glyphPos, glyphLast, glyphPosLast, focusPos);
        isFocus = isFocus && (glyphPos == focusPos);
	}
	return color;
}
 
//////////////////////////////////////////////////////////////////////////////////
	
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	// use square aspect ratio
	vec2 uv = fragCoord;
	uv = fragCoord / iResolution.y;
	uv -= vec2(0.5*iResolution.x / iResolution.y, 0.5);
    uv = InitUV(uv);
	
	// get time 
	float timePercent = iTime*zoomSpeed;
	int iterations = int(floor(timePercent));
	timePercent -= float(iterations);
	
	// update zoom, apply pow to make rate constant
	float zoom = pow(e, -glyphSizeLog*timePercent);
	zoom *= zoomScale;
    
	// get offset
	vec2 offset = vec2(0);
	for (int i = 0; i < 13; ++i)
		offset += ((vec2(GetFocusPos(iterations+i)) + vec2(glyphMargin)) * gsfi) * pow(gsfi, float(i));
    
	// apply zoom & offset
    vec2 uvFractal = uv * zoom + offset;
	
	// check pixel recursion depth
	vec3 pixelFractalColor = GetPixelFractal(uvFractal, iterations, timePercent);
    pixelFractalColor = FinishPixel(pixelFractalColor, uv);
    
	// apply final color
	fragColor = vec4(pixelFractalColor, 1.0);
}
// --------[ Original ShaderToy ends here ]---------- //

void main(void)
{
    mainImage(gl_FragColor, gl_FragCoord.xy);
}