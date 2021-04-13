let easyCam;

function preload() {
  earthTexture = loadImage('images/stretched_icon.png');
}

function setup() {
  let canvas = createCanvas(1000, 1000, WEBGL);
  canvas.elt.oncontextmenu = () => false;

  easyCam = createEasyCam({distance: 300});

  earth = new Planet(50, 0, 0, earthTexture);
  earth.generateSatellites(5);
  earth.generateParticles();
}

function draw() {
  background(0);

  ambientLight(240, 240, 240);
  pointLight(255, 255, 255, 0, 0, 0);

  earth.show();
  earth.orbit();
}
