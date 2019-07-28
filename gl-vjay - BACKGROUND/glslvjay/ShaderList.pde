ArrayList<GShader> shaderList = new ArrayList<GShader>();
int currentShaderIdx = 0;


//load all the suitable shaders from the data directory
//add the parameters for each shader
void setupShaders() {
  textureWrap(REPEAT);

  //soundinput shader INITALIZE !
  GShader InputSound = new GShader("InputSound.frag");
  shaderList.add(InputSound);


  //Galaxy shader
  GShader Galaxy = new GShader("Galaxy.frag");
  shaderList.add(Galaxy);
  Galaxy.parameters.add(new Param("HideStars"));
  //Galaxy.tex1files = new String[]{ "circuit.jpg" };

  //ringOfColor shader
  //GShader ringOfColor = new GShader("ringofcolor.frag");
  //shaderList.add(ringOfColor);
  //Galaxy.parameters.add(new Param("hideStars"));
  //Galaxy.tex1files = new String[]{ "seamlesstex/" };

  // x.glsl FIRST
  GShader X = new GShader("X.frag");
  shaderList.add(X);
  X.parameters.add(new Param("FX1", -0.6, 1));
  X.parameters.add(new Param("FX2", -0.5, 0.5));
  X.parameters.add(new Param("FX3", -0.5, 5));
  X.parameters.add(new Param("FX4", -0.5, 5));

  X.parameters.add(new Param("SHIFTX1", -0.5, 5));
  X.parameters.add(new Param("SHIFTY1", -0.5, 5));
  X.parameters.add(new Param("SHIFTX2", -0.5, 5));
  X.parameters.add(new Param("SHIFTY2", -0.5, 5));

  //DiamondVortex.frag
  GShader DiamondVortex = new GShader("DiamondVortex.frag");
  shaderList.add(DiamondVortex);
  DiamondVortex.parameters.add(new Param("FX1", 9.0, -0.6));
  DiamondVortex.parameters.add(new Param("FX2", -5.0, 5.5));
  DiamondVortex.parameters.add(new Param("FX3", -0.5, 5));
  DiamondVortex.parameters.add(new Param("FX4", -0.5, 5));
  DiamondVortex.parameters.add(new Param("COL1", -0.5, 5));
  DiamondVortex.parameters.add(new Param("COL2", -0.5, 5));
  DiamondVortex.parameters.add(new Param("COL3", 1.2, 2.8));


  //MandleScale.frag
  GShader MandleScale = new GShader("MandleScale.frag");
  shaderList.add(MandleScale);
  MandleScale.parameters.add(new Param("SCALE", -0.5, 5));


  // Plasmah.frag FIRST
  GShader Plasmah = new GShader("Plasmah.frag");
  shaderList.add(Plasmah);
  Plasmah.parameters.add(new Param("FX1", -1.5, 0.5));
  Plasmah.parameters.add(new Param("FX2", 1, 0.5));
  Plasmah.parameters.add(new Param("FX3", -1.5, 5));

  // MandleCircle.frag FIRST
  GShader MandleCircle = new GShader("MandleCircle.frag");
  shaderList.add(MandleCircle);
  MandleCircle.parameters.add(new Param("FX1", -0.5, 5));
  MandleCircle.parameters.add(new Param("FX2", -0.5, 5));
  MandleCircle.parameters.add(new Param("FX3", -0.5, 5));

// MandleBrah.frag
  GShader MandleBrah = new GShader("MandleBrah.frag");
  shaderList.add(MandleBrah);
  MandleBrah.parameters.add(new Param("FX1", -0.5, 5));
  MandleBrah.parameters.add(new Param("FX2", -0.5, 5));
  MandleBrah.parameters.add(new Param("FX3", -0.5, 5));
  MandleBrah.parameters.add(new Param("FX4", -0.5, 5));



  //BallpitBackground.frag
  GShader BallpitBackground = new GShader("BallpitBackground.frag");
  shaderList.add(BallpitBackground);
  BallpitBackground.parameters.add(new Param("FX1", -0.5, 5));



  // RedOrbVortex.frag
  // MandleCircle.glsl FIRST
  GShader RedOrbVortex = new GShader("RedOrbVortex.frag");
  shaderList.add(RedOrbVortex);
  RedOrbVortex.parameters.add(new Param("FX1", -0.5, 5));
  RedOrbVortex.parameters.add(new Param("FX2", 1, 5));
  RedOrbVortex.parameters.add(new Param("FX3", -0.5, 5));
  RedOrbVortex.parameters.add(new Param("FX4", -0.5, 5));

  //Cubescape shader
  GShader Cubescape = new GShader("Cubescape.frag");
  shaderList.add(Cubescape);
  Cubescape.parameters.add(new Param("Brightness", -0.5, 5));
  Cubescape.parameters.add(new Param("Rotation", -1, 1));
  Cubescape.tex1files = new String[]{ "circuit.jpg" };




  //init current shader
  initCurrentShader();
}


void initCurrentShader() {
  //remove old osc plugs using new instance
  if (oscP5 != null) {
    oscP5.stop();
    oscP5.dispose();
  }
  oscP5 = new OscP5(this, 4000); // INCOMING OSC PORT

  //osc plug prev / next shaders 
  OscMessage labelData = new OscMessage("/1/label1");
  labelData.add(shaderList.get(currentShaderIdx).path);//append path of current shader to display
  oscP5.send(labelData, remoteAddr);//send the message
  oscP5.send(labelData, remoteAddr2);//send the message
  //plug
  oscP5.plug(this, "prevShader", "/1/push1");
  oscP5.plug(this, "nextShader", "/1/push2");

  oscP5.plug(this, "pick1", "//1/label1/multitoggle1/2/1");
  oscP5.plug(this, "pick2", "//1/label1/multitoggle1/2/2");
  oscP5.plug(this, "pick3", "//1/label1/multitoggle1/2/3");
  oscP5.plug(this, "pick4", "//1/label1/multitoggle1/2/4");
  oscP5.plug(this, "pick5", "//1/label1/multitoggle1/2/5");
  oscP5.plug(this, "pick6", "//1/label1/multitoggle1/2/6");
  oscP5.plug(this, "pick7", "//1/label1/multitoggle1/2/7");
  oscP5.plug(this, "pick8", "//1/label1/multitoggle1/2/8");
  oscP5.plug(this, "pick9", "//1/label1/multitoggle1/2/9");
  oscP5.plug(this, "pick10", "//1/label1/multitoggle1/2/10");

  oscP5.plug(this, "pick11", "//1/label1/multitoggle1/1/1");
  oscP5.plug(this, "pick12", "//1/label1/multitoggle1/1/2");
  oscP5.plug(this, "pick13", "//1/label1/multitoggle1/1/3");
  oscP5.plug(this, "pick14", "//1/label1/multitoggle1/1/4");
  oscP5.plug(this, "pick15", "//1/label1/multitoggle1/1/5");
  oscP5.plug(this, "pick16", "//1/label1/multitoggle1/1/6");
  oscP5.plug(this, "pick17", "//1/label1/multitoggle1/1/7");
  oscP5.plug(this, "pick18", "//1/label1/multitoggle1/1/8");
  oscP5.plug(this, "pick19", "//1/label1/multitoggle1/1/9");
  oscP5.plug(this, "pick20", "//1/label1/multitoggle1/1/10");

  //plug prev / next shader
  shaderList.get(currentShaderIdx).addOscPlugs();
}

void prevShader(float val) {
  if (val==0.0) {
    currentShaderIdx = (currentShaderIdx - 1) % shaderList.size();
    if (currentShaderIdx<0)
      currentShaderIdx=shaderList.size()-1;
    initCurrentShader();
  }
}
void nextShader(float val) {
  if (val==0.0) {
    currentShaderIdx = (currentShaderIdx + 1) % shaderList.size();
    initCurrentShader();
  }
}


void pick1(float val) {
  if (val==0.0) {
    currentShaderIdx = 1;
    initCurrentShader();
  }
}
void pick2(float val) {
  if (val==0.0) {
    currentShaderIdx = 2;
    initCurrentShader();
  }
}
void pick3(float val) {
  if (val==0.0) {
    currentShaderIdx = 3;
    initCurrentShader();
  }
}
void pick4(float val) {
  if (val==0.0) {
    currentShaderIdx = 4;
    initCurrentShader();
  }
}
void pick5(float val) {
  if (val==0.0) {
    currentShaderIdx = 5;
    initCurrentShader();
  }
}
void pick6(float val) {
  if (val==0.0) {
    currentShaderIdx = 6;
    initCurrentShader();
  }
}
void pick7(float val) {
  if (val==0.0) {
    currentShaderIdx = 7;
    initCurrentShader();
  }
}
void pick8(float val) {
  if (val==0.0) {
    currentShaderIdx = 8;
    initCurrentShader();
  }
}
void pick9(float val) {
  if (val==0.0) {
    currentShaderIdx = 9;
    initCurrentShader();
  }
}
void pick10(float val) {
  if (val==0.0) {
    currentShaderIdx = 10;
    initCurrentShader();
  }
}
void pick11(float val) {
  if (val==0.0) {
    currentShaderIdx = 11;
    initCurrentShader();
  }
}
void pick12(float val) {
  if (val==0.0) {
    currentShaderIdx = 12;
    initCurrentShader();
  }
}
void pick13(float val) {
  if (val==0.0) {
    currentShaderIdx = 13;
    initCurrentShader();
  }
}
void pick14(float val) {
  if (val==0.0) {
    currentShaderIdx = 14;
    initCurrentShader();
  }
}
void pick15(float val) {
  if (val==0.0) {
    currentShaderIdx = 15;
    initCurrentShader();
  }
}
void pick16(float val) {
  if (val==0.0) {
    currentShaderIdx = 16;
    initCurrentShader();
  }
}
void pick17(float val) {
  if (val==0.0) {
    currentShaderIdx = 17;
    initCurrentShader();
  }
}
void pick18(float val) {
  if (val==0.0) {
    currentShaderIdx = 18;
    initCurrentShader();
  }
}
void pick19(float val) {
  if (val==0.0) {
    currentShaderIdx = 19;
    initCurrentShader();
  }
}
void pick20(float val) {
  if (val==0.0) {
    currentShaderIdx = 20;
    initCurrentShader();
  }
}
