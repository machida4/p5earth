let easyCam;

function preload() {
  earthTexture = loadImage('images/stretched_icon.png');
}

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight - 10, WEBGL);
  canvas.elt.oncontextmenu = () => false;

  easyCam = createEasyCam({distance: 300});

  earth = new Planet(50, 0, 0, earthTexture);
  earth.generateSatellites(2);
  earth.generateParticles(300);
}

function draw() {
  background(0);

  ambientLight(240, 240, 240);
  pointLight(255, 255, 255, 0, 0, 0);

  earth.show();
  earth.orbit();
}

