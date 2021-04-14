class Planet {
  constructor(radius, distance, orbitspeed, texture) {
    this.v = p5.Vector.random3D();

    this.radius = radius;
    this.distance = distance;
    this.v.mult(this.distance);
    this.angle = 0; 
    this.orbitspeed = orbitspeed;
    this.texture = texture;

    this.planets = [];
    this.particles = [];
  }

  show() {
    push();
    noStroke();

    let v2 = createVector(1, 0, 1);
    let p = this.v.cross(v2);

    if (p.x != 0 || p.y != 0 || p.z != 0) {
      rotate(this.angle, p);
    }
    stroke(255);

    translate(this.v.x, this.v.y, this.v.z);
    noStroke();
    texture(this.texture);
    sphere(this.radius);

    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].show();
    }

    pop();
  }

  orbit() {
    this.angle = this.angle + this.orbitspeed;
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].orbit();
    }
  }

  generateSatellites(count) {
    this.planets = [];

    for (let i = 0; i < count; i++) {
      let radius = random(this.radius / 3, this.radius / 6);
      let distance = random(this.radius + radius * 2 , (this.radius + radius) * 2);
      let orbitspeed = random(-0.05, 0.05);
      this.planets[i] = new Planet(radius, distance, orbitspeed, this.texture);
    }
  }

  generateParticles(count) {
    this.particles = [];

    for (let i = 0; i < count; i++) {
      let radius = random(this.radius / 15);
      let distance = random(this.radius * 2.5, this.radius * 2.6);
      let orbitspeed = random(0.008, 0.01); 
      if (Math.floor(random() * 2) == 0) {
        orbitspeed *= -1;
      }
      this.planets[i] = new Planet(radius, distance, orbitspeed, this.texture);
    }
  }
}

class Particle extends Planet {
  constructor(count) {
    super(count);
  }
}
