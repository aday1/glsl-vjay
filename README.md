# glsl-vjay
Performance-ready [Processing](https://processing.org/) sketch to use different GLSL shaders (mostly from shadertoy) for live music visualization with OSC.

glsl-vjay supports / will support the following features:
- [x] easy integration of www.shadertoy.com fragment shaders
- [x] Audio analysis
  - [x] live input from "Stereomix" / "What you hear" (requires some setup)
  - [x] FFT, waveform and beat detection
- [x] [TouchOSC](http://hexler.net/software/touchosc) layout for live adjustments
  - [x] sensitivity and smoothness 
  - [x] speed and intensity
  - [x] shader / texture selection
  - [x] shader specific parameters
- [x] automatically maps shader parameters to an OSC control
- [x] Texture slide-show
  - [x] periodically change input textures for shaders
  - [ ] smooth blending between two textures
- [ ] map shader parameters to dynamic values from FFT, BeatDetection or Time
- [ ] support for multipass / feedback shaders


𝖊𝖗𝖗𝖔𝖗 𝖉𝖎𝖋𝖋𝖚𝖘𝖎𝖔𝖓 remix 
- [x] SPOUT SUPPORT (120FPS when Disabling the VU)
- [x] Keyboard shortcuts
  - (F) - FPS Display
  - (R) - Reload Shader (for live coding !!!!)
  - (Number Keys (or Shift Number keys)) - Lets you select up to 20 shaders
  - (-) Previous Shader
  - (+) - Next Shader

  A foreground Shader for video routing running on port 4001 - Spouting at 640x480 (For a nice square video routing layer)
  A background Shader for video routing running on port 4000 - Spouting at 3200x360 (Maggies Art Space - Melbourne)

- OSCMonitor.exe for routing between layers. (use echo)



-- Current branch WIP for https://breakcore.com.au/viewtopic.php?f=8&t=179
