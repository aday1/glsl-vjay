ArrayList<GShader> shaderList = new ArrayList<GShader>();
int currentShaderIdx = 0;


//load all the suitable shaders from the data directory
//add the parameters for each shader
void setupShaders() {
  textureWrap(REPEAT);

/*
   ___  
  / _ \ 
 | | | |
 | | | |
 | |_| |
  \___/ 
        
*/


  //soundinput shader INIT !
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


  // Binary.frag FIRST
  GShader Plasmah = new GShader("Binary.frag");
  shaderList.add(Plasmah);
  Plasmah.parameters.add(new Param("FX1", 0.0, 1.0));
  

  // MandleCircle.frag FIRST
  GShader MandleCircle = new GShader("MandleCircle.frag");
  shaderList.add(MandleCircle);
  MandleCircle.parameters.add(new Param("FX1", -0.5, 5));
  MandleCircle.parameters.add(new Param("FX2", -0.5, 5));
  MandleCircle.parameters.add(new Param("FX3", -0.5, 5));

// MandleBrah.frag
  GShader MandleBrah = new GShader("MandleBrah.frag");
  shaderList.add(MandleBrah);
  
  MandleBrah.parameters.add(new Param("glow", 1.5, 0.1));
  MandleBrah.parameters.add(new Param("glow2", 0.3, 1.0));
  MandleBrah.parameters.add(new Param("orb", 0.0, 10.0));
  MandleBrah.parameters.add(new Param("scale", 0.4, 0.4));
  MandleBrah.parameters.add(new Param("scale2", 5, -5));


  //BallpitBackground.frag
  GShader BallpitBackground = new GShader("BallpitBackground.frag");
  shaderList.add(BallpitBackground);
  BallpitBackground.parameters.add(new Param("FX1", -0.5, 5));

  //BoxExplosion.frag
  GShader BoxExplosion = new GShader("BoxExplosion.frag");
  shaderList.add(BoxExplosion);
  BoxExplosion.parameters.add(new Param("FX1", -50.0, -5));
  BoxExplosion.parameters.add(new Param("FX2", 0.0, 1));
  BoxExplosion.parameters.add(new Param("FX3", 0.0, 1));
  BoxExplosion.parameters.add(new Param("FX4", 0.0, 1));
  BoxExplosion.parameters.add(new Param("Scale", 0.0, 1));
  
  

/*
  __  ___  
 /_ |/ _ \ 
  | | | | |
  | | | | |
  | | |_| |
  |_|\___/ 
*/


  // RedOrbVortex.frag
  // MandleCircle.glsl FIRST
  GShader RedOrbVortex = new GShader("RedOrbVortex.frag");
  shaderList.add(RedOrbVortex);
  RedOrbVortex.parameters.add(new Param("FX1", 0.2, -0.2));
  RedOrbVortex.parameters.add(new Param("FX2", 1, 5));
  RedOrbVortex.parameters.add(new Param("FX3", -0.5, 0.3));
  RedOrbVortex.parameters.add(new Param("FX4", -0.5, 5));


//ImpulseTunnel1.frag
  GShader ImpulseTunnel1 = new GShader("ImpulseTunnel1.frag");
  shaderList.add(ImpulseTunnel1);
  ImpulseTunnel1.parameters.add(new Param("FX1", -0.5, 5));

//GridTunnel.frag
  GShader GridTunnel = new GShader("GridTunnel.frag");
  shaderList.add(GridTunnel);
  GridTunnel.parameters.add(new Param("FX2", -0.1, 1));
  GridTunnel.parameters.add(new Param("FX2", -15.0, 50));
  GridTunnel.parameters.add(new Param("FX3", 0.9, 0.0));
  GridTunnel.parameters.add(new Param("FX4", 1, 0));
  GridTunnel.parameters.add(new Param("scale", 1.0, 0.0));
  

//FireVoxtex.frag
  GShader FireVortex = new GShader("FireVoxtex.frag");
  shaderList.add(FireVortex);
  FireVortex.parameters.add(new Param("FX1", 0.16769314, 0.75243664));
  FireVortex.parameters.add(new Param("FX2", 0, 1));
  FireVortex.parameters.add(new Param("brightness", 10, 50));
  FireVortex.parameters.add(new Param("scale", 1, 2.0289135));
  FireVortex.parameters.add(new Param("rotation", -1.0, 1.0));

  //Hellscape.frag
  GShader Hellscape = new GShader("Hellscape.frag");
  shaderList.add(Hellscape);
  Hellscape.parameters.add(new Param("FX1", 1.3856834, 0.04794734));
  Hellscape.parameters.add(new Param("col1", 1, -1));
  Hellscape.parameters.add(new Param("movement", 1, -1));
  Hellscape.parameters.add(new Param("rotation", 1.0, -1.0));

  //Hellline.frag
  GShader Hellline = new GShader("Hellline.frag");
  shaderList.add(Hellline);
  Hellline.parameters.add(new Param("FX1", 1.3856834, 0.04794734));
  Hellline.parameters.add(new Param("col1", 1, -1));
  Hellline.parameters.add(new Param("movement", 1, -1));
  Hellline.parameters.add(new Param("rotation", 1.0, -1.0));

  //AlienOrbPlanet.frag
  GShader AlienOrbPlanet = new GShader("AlienOrbPlanet.frag");
  shaderList.add(AlienOrbPlanet);
  AlienOrbPlanet.parameters.add(new Param("FX1", 1, 0));
  AlienOrbPlanet.parameters.add(new Param("lightning", 1, 0));
  AlienOrbPlanet.parameters.add(new Param("rotation", 1, 0));
  
  
  //Hexiworld.frag
  GShader Hexiworld = new GShader("Hexiworld.frag");
  shaderList.add(Hexiworld);
  Hexiworld.parameters.add(new Param("FX1", 1.0, 0.0));
  Hexiworld.parameters.add(new Param("FX2", 1.0, 0.0));
  Hexiworld.parameters.add(new Param("rotation", 1.0, 0.0));
  
  
//TorusViewPort.frag
  GShader TorusViewPort = new GShader("TorusViewPort.frag");
  shaderList.add(TorusViewPort);
  TorusViewPort.parameters.add(new Param("FX1", 0.0, 1.0));
  TorusViewPort.parameters.add(new Param("FX2", 0.0, 1.0));
  TorusViewPort.parameters.add(new Param("FX3", 0.0, 1.0));
  TorusViewPort.parameters.add(new Param("FX4", 0.0, 1.0));
  
  
  //OrbCube.frag
  GShader OrbCube = new GShader("OrbCube.frag");
  shaderList.add(OrbCube);
  OrbCube.parameters.add(new Param("FX1", 1, 0));
  OrbCube.parameters.add(new Param("FX1", 1, 0));
  OrbCube.parameters.add(new Param("FX1", 1, 0));
  OrbCube.parameters.add(new Param("FX1", 1, 0));
  

  
  //Cubescape shader
  GShader Cubescape = new GShader("Cubescape.frag");
  shaderList.add(Cubescape);
  Cubescape.parameters.add(new Param("Brightness", -0.5, 5));
  Cubescape.parameters.add(new Param("Rotation", -1, 1));
  Cubescape.tex1files = new String[]{ "circuit.jpg" };



/*
  ___   ___  
 |__ \ / _ \ 
    ) | | | |
   / /| | | |
  / /_| |_| |
 |____|\___/ 
             
*/                         


/*
  ____   ___  
 |___ \ / _ \ 
   __) | | | |
  |__ <| | | |
  ___) | |_| |
 |____/ \___/ 
*/


/*_  _    ___  
 | || |  / _ \ 
 | || |_| | | |
 |__   _| | | |
    | | | |_| |
    |_|  \___/ 
*/


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
  oscP5.send(labelData, remoteAddr1);//send the message
  oscP5.send(labelData, remoteAddr2);//send the message
  oscP5.send(labelData, remoteAddr3);//send the message
  oscP5.send(labelData, remoteAddr4);//send the message
  //plug
  oscP5.plug(this, "prevShader", "/1/push1");
  oscP5.plug(this, "nextShader", "/1/push2");

  oscP5.plug(this, "pick1", "//1/label1/multitoggle1/3/1");
  oscP5.plug(this, "pick2", "//1/label1/multitoggle1/3/2");
  oscP5.plug(this, "pick3", "//1/label1/multitoggle1/3/3");
  oscP5.plug(this, "pick4", "//1/label1/multitoggle1/3/4");
  oscP5.plug(this, "pick5", "//1/label1/multitoggle1/3/5");
  oscP5.plug(this, "pick6", "//1/label1/multitoggle1/3/6");
  oscP5.plug(this, "pick7", "//1/label1/multitoggle1/3/7");
  oscP5.plug(this, "pick8", "//1/label1/multitoggle1/3/8");
  oscP5.plug(this, "pick9", "//1/label1/multitoggle1/3/9");
  oscP5.plug(this, "pick10", "//1/label1/multitoggle1/3/10");

  oscP5.plug(this, "pick11", "//1/label1/multitoggle1/2/1");
  oscP5.plug(this, "pick12", "//1/label1/multitoggle1/2/2");
  oscP5.plug(this, "pick13", "//1/label1/multitoggle1/2/3");
  oscP5.plug(this, "pick14", "//1/label1/multitoggle1/2/4");
  oscP5.plug(this, "pick15", "//1/label1/multitoggle1/2/5");
  oscP5.plug(this, "pick16", "//1/label1/multitoggle1/2/6");
  oscP5.plug(this, "pick17", "//1/label1/multitoggle1/2/7");
  oscP5.plug(this, "pick18", "//1/label1/multitoggle1/2/8");
  oscP5.plug(this, "pick19", "//1/label1/multitoggle1/2/9");
  oscP5.plug(this, "pick20", "//1/label1/multitoggle1/2/10");
  
  oscP5.plug(this, "pick31", "//1/label1/multitoggle1/1/1");
  oscP5.plug(this, "pick32", "//1/label1/multitoggle1/1/2");
  oscP5.plug(this, "pick33", "//1/label1/multitoggle1/1/3");
  oscP5.plug(this, "pick34", "//1/label1/multitoggle1/1/4");
  oscP5.plug(this, "pick35", "//1/label1/multitoggle1/1/5");
  oscP5.plug(this, "pick36", "//1/label1/multitoggle1/1/6");
  oscP5.plug(this, "pick37", "//1/label1/multitoggle1/1/7");
  oscP5.plug(this, "pick38", "//1/label1/multitoggle1/1/8");
  oscP5.plug(this, "pick39", "//1/label1/multitoggle1/1/9");
  oscP5.plug(this, "pick40", "//1/label1/multitoggle1/1/10");
  
    

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
