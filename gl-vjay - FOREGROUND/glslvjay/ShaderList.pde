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

 
  // PentagramFG.glsl PENTAGRAM1
  GShader PentagramFG = new GShader("PentagramFG.frag");
  shaderList.add(PentagramFG);
  PentagramFG.parameters.add(new Param("FX1", 0.2, -0.2));
  

  // Summoner.glsl Summoner
  GShader Summoner = new GShader("Summoner.frag");
  shaderList.add(Summoner);
  Summoner.parameters.add(new Param("FX1", 0.2, -0.2));
  Summoner.parameters.add(new Param("FX2", 5, 0));

// LINEMATH.glsl THIRD
  GShader LINEMATH = new GShader("LINEMATH.frag");
  shaderList.add(LINEMATH);
  LINEMATH.parameters.add(new Param("FX1", 100.0, -100.0));
  LINEMATH.parameters.add(new Param("FX2", 100.0, -100.0));
  LINEMATH.parameters.add(new Param("FX3", 100.0, -100.0));
  LINEMATH.parameters.add(new Param("FX4", 100.0, -100.0));

// DRAW.glsl DRAW
  GShader DRAW = new GShader("DRAW.frag");
  shaderList.add(DRAW);
  DRAW.parameters.add(new Param("FX1", -1.0, 1.0));
  DRAW.parameters.add(new Param("FX2", 100.0, -100));
  DRAW.parameters.add(new Param("FX3", 100.0, -100));
  DRAW.parameters.add(new Param("FX4", 100.0, -100));

// FIFTH.glsl FIFTH
  GShader FIFTH = new GShader("FIFTH.frag");
  shaderList.add(FIFTH);
  FIFTH.parameters.add(new Param("FX1", 0.2, -0.2));
  FIFTH.parameters.add(new Param("FX2", 1, 5));
  FIFTH.parameters.add(new Param("FX3", -0.5, 0.3));
  FIFTH.parameters.add(new Param("FX4", -0.5, 5));

// SIXTH.glsl SIXTH
  GShader SIXTH = new GShader("SIXTH.frag");
  shaderList.add(SIXTH);
  SIXTH.parameters.add(new Param("FX1", 0.2, -0.2));
  SIXTH.parameters.add(new Param("FX2", 1, 5));
  SIXTH.parameters.add(new Param("FX3", -0.5, 0.3));
  SIXTH.parameters.add(new Param("FX4", -0.5, 5));


// SEVENTH.glsl SEVENTH
  GShader SEVENTH = new GShader("SEVENTH.frag");
  shaderList.add(SEVENTH);
  SEVENTH.parameters.add(new Param("FX1", 0.2, -0.2));
  SEVENTH.parameters.add(new Param("FX2", 1, 5));
  SEVENTH.parameters.add(new Param("FX3", -0.5, 0.3));
  SEVENTH.parameters.add(new Param("FX4", -0.5, 5));


// EIGHTH.glsl EIGHTH
  GShader EIGHTH = new GShader("EIGHTH.frag");
  shaderList.add(EIGHTH);
  EIGHTH.parameters.add(new Param("FX1", 0.2, -0.2));
  EIGHTH.parameters.add(new Param("FX2", 1, 5));
  EIGHTH.parameters.add(new Param("FX3", -0.5, 0.3));
  EIGHTH.parameters.add(new Param("FX4", -0.5, 5));


// NINETH.glsl NINETH
  GShader NINETH = new GShader("NINETH.frag");
  shaderList.add(NINETH);
  NINETH.parameters.add(new Param("FX1", 0.2, -0.2));
  NINETH.parameters.add(new Param("FX2", 1, 5));
  NINETH.parameters.add(new Param("FX3", -0.5, 0.3));
  NINETH.parameters.add(new Param("FX4", -0.5, 5));


/*
  __  ___  
 /_ |/ _ \ 
  | | | | |
  | | | | |
  | | |_| |
  |_|\___/ 
*/

// TENTH.glsl TENTH
  GShader TENTH = new GShader("TENTH.frag");
  shaderList.add(TENTH);
  TENTH.parameters.add(new Param("FX1", 0.2, -0.2));
  TENTH.parameters.add(new Param("FX2", 1, 5));
  TENTH.parameters.add(new Param("FX3", -0.5, 0.3));
  TENTH.parameters.add(new Param("FX4", -0.5, 5));

// ELEVENTH.glsl ELEVENTH
  GShader ELEVENTH = new GShader("ELEVENTH.frag");
  shaderList.add(ELEVENTH);
  ELEVENTH.parameters.add(new Param("FX1", 0.2, -0.2));
  ELEVENTH.parameters.add(new Param("FX2", 1, 5));
  ELEVENTH.parameters.add(new Param("FX3", -0.5, 0.3));
  ELEVENTH.parameters.add(new Param("FX4", -0.5, 5));

// TWELTH.glsl TWELTH
  GShader TWELTH = new GShader("TWELTH.frag");
  shaderList.add(TWELTH);
  TWELTH.parameters.add(new Param("FX1", 0.2, -0.2));
  TWELTH.parameters.add(new Param("FX2", 1, 5));
  TWELTH.parameters.add(new Param("FX3", -0.5, 0.3));
  TWELTH.parameters.add(new Param("FX4", -0.5, 5));

// THIRTHEENTH.glsl THIRTHEENTH
  GShader THIRTHEENTH = new GShader("THIRTHEENTH.frag");
  shaderList.add(THIRTHEENTH);
  THIRTHEENTH.parameters.add(new Param("FX1", 0.2, -0.2));
  THIRTHEENTH.parameters.add(new Param("FX2", 1, 5));
  THIRTHEENTH.parameters.add(new Param("FX3", -0.5, 0.3));
  THIRTHEENTH.parameters.add(new Param("FX4", -0.5, 5));

// FOURTEENTH.glsl FOURTEENTH
  GShader FOURTEENTH = new GShader("FOURTEENTH.frag");
  shaderList.add(FOURTEENTH);
  FOURTEENTH.parameters.add(new Param("FX1", 0.2, -0.2));
  FOURTEENTH.parameters.add(new Param("FX2", 1, 5));
  FOURTEENTH.parameters.add(new Param("FX3", -0.5, 0.3));
  FOURTEENTH.parameters.add(new Param("FX4", -0.5, 5));

// FIFTHEENTH.glsl FIFTHEENTH
  GShader FIFTHEENTH = new GShader("FIFTHEENTH.frag");
  shaderList.add(FIFTHEENTH);
  FIFTHEENTH.parameters.add(new Param("FX1", 0.2, -0.2));
  FIFTHEENTH.parameters.add(new Param("FX2", 1, 5));
  FIFTHEENTH.parameters.add(new Param("FX3", -0.5, 0.3));
  FIFTHEENTH.parameters.add(new Param("FX4", -0.5, 5));

// SIXTHEENTH.glsl SIXTHEENTH
  GShader SIXTHEENTH = new GShader("SIXTHEENTH.frag");
  shaderList.add(SIXTHEENTH);
  SIXTHEENTH.parameters.add(new Param("FX1", 0.2, -0.2));
  SIXTHEENTH.parameters.add(new Param("FX2", 1, 5));
  SIXTHEENTH.parameters.add(new Param("FX3", -0.5, 0.3));
  SIXTHEENTH.parameters.add(new Param("FX4", -0.5, 5));

// SEVENTEEN.glsl SEVENTEEN
  GShader SEVENTEEN = new GShader("SEVENTEEN.frag");
  shaderList.add(SEVENTEEN);
  SEVENTEEN.parameters.add(new Param("FX1", 0.2, -0.2));
  SEVENTEEN.parameters.add(new Param("FX2", 1, 5));
  SEVENTEEN.parameters.add(new Param("FX3", -0.5, 0.3));
  SEVENTEEN.parameters.add(new Param("FX4", -0.5, 5));

// EIGHTEENTH.glsl EIGHTEENTH
  GShader EIGHTEENTH = new GShader("EIGHTEENTH.frag");
  shaderList.add(EIGHTEENTH);
  EIGHTEENTH.parameters.add(new Param("FX1", 0.2, -0.2));
  EIGHTEENTH.parameters.add(new Param("FX2", 1, 5));
  EIGHTEENTH.parameters.add(new Param("FX3", -0.5, 0.3));
  EIGHTEENTH.parameters.add(new Param("FX4", -0.5, 5));

// NINETEEN.glsl NINETEEN
  GShader NINETEEN = new GShader("NINETEEN.frag");
  shaderList.add(NINETEEN);
  NINETEEN.parameters.add(new Param("FX1", 0.2, -0.2));
  NINETEEN.parameters.add(new Param("FX2", 1, 5));
  NINETEEN.parameters.add(new Param("FX3", -0.5, 0.3));
  NINETEEN.parameters.add(new Param("FX4", -0.5, 5));




/*
  ___   ___  
 |__ \ / _ \ 
    ) | | | |
   / /| | | |
  / /_| |_| |
 |____|\___/ 
             
*/           

// TWENTY.glsl TWENTY
  GShader TWENTY = new GShader("TWENTY.frag");
  shaderList.add(TWENTY);
  TWENTY.parameters.add(new Param("FX1", 0.2, -0.2));
  TWENTY.parameters.add(new Param("FX2", 1, 5));
  TWENTY.parameters.add(new Param("FX3", -0.5, 0.3));
  TWENTY.parameters.add(new Param("FX4", -0.5, 5));

// TWENTYTWO.glsl TWENTYTWO
  GShader TWENTYTWO = new GShader("TWENTYTWO.frag");
  shaderList.add(TWENTYTWO);
  TWENTYTWO.parameters.add(new Param("FX1", 0.2, -0.2));
  TWENTYTWO.parameters.add(new Param("FX2", 1, 5));
  TWENTYTWO.parameters.add(new Param("FX3", -0.5, 0.3));
  TWENTYTWO.parameters.add(new Param("FX4", -0.5, 5));

// TWENTYTHREE.glsl TWENTYTHREE
  GShader TWENTYTHREE = new GShader("TWENTYTHREE.frag");
  shaderList.add(TWENTYTHREE);
  TWENTYTHREE.parameters.add(new Param("FX1", 0.2, -0.2));
  TWENTYTHREE.parameters.add(new Param("FX2", 1, 5));
  TWENTYTHREE.parameters.add(new Param("FX3", -0.5, 0.3));
  TWENTYTHREE.parameters.add(new Param("FX4", -0.5, 5));

// TWENTYFOUR.glsl TWENTYFOUR
  GShader TWENTYFOUR = new GShader("TWENTYFOUR.frag");
  shaderList.add(TWENTYFOUR);
  TWENTYFOUR.parameters.add(new Param("FX1", 0.2, -0.2));
  TWENTYFOUR.parameters.add(new Param("FX2", 1, 5));
  TWENTYFOUR.parameters.add(new Param("FX3", -0.5, 0.3));
  TWENTYFOUR.parameters.add(new Param("FX4", -0.5, 5));

// TWENTYFIVE.glsl TWENTYFIVE
  GShader TWENTYFIVE = new GShader("TWENTYFIVE.frag");
  shaderList.add(TWENTYFIVE);
  TWENTYFIVE.parameters.add(new Param("FX1", 0.2, -0.2));
  TWENTYFIVE.parameters.add(new Param("FX2", 1, 5));
  TWENTYFIVE.parameters.add(new Param("FX3", -0.5, 0.3));
  TWENTYFIVE.parameters.add(new Param("FX4", -0.5, 5));

// TWENTYSIX.glsl TWENTYSIX
  GShader TWENTYSIX = new GShader("TWENTYSIX.frag");
  shaderList.add(TWENTYSIX);
  TWENTYSIX.parameters.add(new Param("FX1", 0.2, -0.2));
  TWENTYSIX.parameters.add(new Param("FX2", 1, 5));
  TWENTYSIX.parameters.add(new Param("FX3", -0.5, 0.3));
  TWENTYSIX.parameters.add(new Param("FX4", -0.5, 5));

// TWENTYSEVEN.glsl TWENTYSEVEN
  GShader TWENTYSEVEN = new GShader("TWENTYSEVEN.frag");
  shaderList.add(TWENTYSEVEN);
  TWENTYSEVEN.parameters.add(new Param("FX1", 0.2, -0.2));
  TWENTYSEVEN.parameters.add(new Param("FX2", 1, 5));
  TWENTYSEVEN.parameters.add(new Param("FX3", -0.5, 0.3));
  TWENTYSEVEN.parameters.add(new Param("FX4", -0.5, 5));

// TWENTYEIGHT.glsl TWENTYEIGHT
  GShader TWENTYEIGHT = new GShader("TWENTYEIGHT.frag");
  shaderList.add(TWENTYEIGHT);
  TWENTYEIGHT.parameters.add(new Param("FX1", 0.2, -0.2));
  TWENTYEIGHT.parameters.add(new Param("FX2", 1, 5));
  TWENTYEIGHT.parameters.add(new Param("FX3", -0.5, 0.3));
  TWENTYEIGHT.parameters.add(new Param("FX4", -0.5, 5));

// TWENTYNINE.glsl TWENTYNINE
  GShader TWENTYNINE = new GShader("TWENTYNINE.frag");
  shaderList.add(TWENTYNINE);
  TWENTYNINE.parameters.add(new Param("FX1", 0.2, -0.2));
  TWENTYNINE.parameters.add(new Param("FX2", 1, 5));
  TWENTYNINE.parameters.add(new Param("FX3", -0.5, 0.3));
  TWENTYNINE.parameters.add(new Param("FX4", -0.5, 5));

// THIRTY.glsl THIRTY
  GShader THIRTY = new GShader("THIRTY.frag");
  shaderList.add(THIRTY);
  THIRTY.parameters.add(new Param("FX1", 0.2, -0.2));
  THIRTY.parameters.add(new Param("FX2", 1, 5));
  THIRTY.parameters.add(new Param("FX3", -0.5, 0.3));
  THIRTY.parameters.add(new Param("FX4", -0.5, 5));





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
