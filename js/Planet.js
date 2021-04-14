class Planet {
  constructor(radius, distance, orbitspeed, texture) {
    this.radius = radius;
    this.distance = distance;
    this.angle = random(TWO_PI); 
    this.orbitspeed = orbitspeed;
    this.texture = texture;

    this.v = p5.Vector.random3D().mult(this.distance);

    this.satellites = [];
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

    for (let i = 0; i < this.satellites.length; i++) {
      this.satellites[i].show();
    }

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }

    pop();
  }

  orbit() {
    this.angle = this.angle + this.orbitspeed;

    for (let i = 0; i < this.satellites.length; i++) {
      this.satellites[i].orbit();
    }

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].orbit();
    }
  }

  generateSatellites(count) {
    this.satellites = [];

    for (let i = 0; i < count; i++) {
      let radius = random(this.radius / 2.5, this.radius / 1.5);
      let distance = random(this.radius + radius * 6 , (this.radius + radius) * 6);
      let orbitspeed = random(-0.05, 0.05);
      this.satellites[i] = new Planet(radius, distance, orbitspeed, this.texture);
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
      this.particles[i] = new Particle(radius, distance, orbitspeed, this.texture);
    }
  }
}

class Particle extends Planet {
  constructor(radius, distance, orbitspeed, texture) {
    super(radius, distance, orbitspeed, texture);
    this.v = new p5.Vector(0.15, random(0.08, 0.1), 0.0).normalize().mult(this.distance);
  }
}
