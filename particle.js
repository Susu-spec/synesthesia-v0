class Particle {
    constructor(position) {
      this.position = position;
      this.velocity = p5.Vector.random3D();
      // .mult(random(2, 4))
      // let theta = random(TWO_PI);
      // let phi = random(-PI/4, PI/4);
      // this.accelerator = createVector(0, 0.05);
      // this.velocity = createVector(random(-1, 1), random(-1, 1));
      // this.position = createVector(
      //   radius * cos(phi) * cos(theta), 
      //   radius * cos(phi) * sin(theta),
      //   radius * cos(phi)
      // );
      // this.rotationSpeed = random(0.01, 0.05);
      // this.approaching = true;
      this.lifespan = 255;
    }
  
    update() {
      this.velocity.mult(1.01);
      this.position.add(this.velocity);
      if (this.position.mag() > 200) {
        this.position.normalize().mult(200);
        
      }
      // this.velocity = p5.Vector.random3D().mult(random(2, 4));
      // if (this.approaching) {
      //   this.position.x -= approachingSpeed;
      //   if (this.position.x <= 0) {
      //     this.approaching = false;
      //   }
      // }
      // else {
      //   this.position.rotateZ(this.rotationSpeed);
      //   this.position.rotateZ(this.rotationSpeed * 0.5)
      // }
      // this.velocity.add(this.accelerator);
      // this.position.add(this.velocity);
      this.lifespan -= 2;
    }
  
    isDead() {
      if (this.lifespan <= 0) {
        return true;
      }
      else {
        return false;
      }
    }
  
    display() {
      push();
      translate(this.position.x, this.position.y, this.position.z);
      stroke(199, 80, 88);
      strokeWeight(2);
      fill(199, 80, 88);
      ellipse(0, 0, 2.7, 2.7);
      pop();
    }
  }
  
  class ParticleSystem {
    constructor (particles, x, y, z) {
      this.particles = particles;
      this.particle;
      this.position;
      this.x = x;
      this.y = y;
      this.z = z;
    }
  
    run() {
      for (let i = 0; i < 4; i++){
        diAngle = map(i, 0, 4, 0, PI);
      }
      for(let i = 0; i < 360; i++) {
        let angle = map(i, 0, 360, 0, TWO_PI);
        let xPos = this.x + 200 * cos(angle);
        let yPos = this.y + r * sin(angle) * cos(diAngle);
        let zPos = this.z + r * sin(angle) * cos(diAngle);
        this.position = createVector(xPos, yPos, zPos);
        this.particle = new Particle(this.position) 
      }
    
        
    }
  
    display() {
      
      this.particles.push(this.particle); 
      if (this.particle.isDead()) {
        this.particles.remove(this.particle);
      }
      for(let particle of particles) {
        particle.update();
        particle.display();
      }
      
    }
  
   
  }
   
  
  // class Particle {
  //   constructor(position) {
  //     this.position = position;
  //     this.velocity = p5.Vector.random3D();
  //     this.lifespan = 255;
  //   }
  
  //   update() {
  //     this.velocity.mult(1.01);
  //     this.position.add(this.velocity);
  //     if (this.position.mag() > 200) {
  //       this.position.normalize().mult(200);
  //     }
  //     this.lifespan -= 2;
  //   }
  
  //   display() {
  //     push();
  //     translate(this.position.x, this.position.y, this.position.z);
  //     stroke(199, 80, 88);
  //     strokeWeight(2);
  //     fill(199, 80, 88);
  //     ellipse(0, 0, 2.7, 2.7);
  //     // console.log("done");
  //     pop();
  //   }
  // }
  
  // class ParticleSystem {
  //   constructor(particles) {
  //     this.particles = particles;
  //   }
  
  //   run() {
  //     this.particles.push(particle);
  //     for (let particle of this.particles) {
  //       particle.update();
  //       particle.display();
  //       // console.log("done")
  //     }
  //   }
  // }
  
  for (let i = 0; i < 4; i++) {
    let diAngle = map(i, 0, 4, 0, PI);
    for (let j = 0; j < numParticles; j++) {
  
      let angle = map(i, 0, 360, 0, TWO_PI);
      let xPos = r * cos(angle);
      let yPos = r * sin(angle) * cos(diAngle);
      let zPos = r * sin(angle) * cos(diAngle);
      position = createVector(xPos, yPos, zPos);
      particle = new Particle(position);
      // console.log("done");
    }
    particleSystem = new ParticleSystem(particles);
}  
// ParticleSystem.display();
  // ParticleSystem.update();

  // class Particle {
//   constructor() {
//     this.position;
//   //   this.velocity = createVector(-200, 200);
//   }



//   display() {
//     push();
//     translate(this.position.x, this.position.y, this.position.z);
//     stroke(199, 80, 88);
//     strokeWeight(2);
//     fill(199, 80, 88);
//     ellipse(0, 0, 2.7, 2.7);
//     pop();
//   }
// }


// class Particlesystem {
//   constructor(particles) {
//     // this.particle = particle;
//     this.particles = particles;
//   }

// //   run() {
// //     angles = random(30, 380);
// //     let j = 0;
// //     for (let i = 0; i < numParticles; i++) {
// //       radii[i] = radii[i] + PI/200;
// //       this.position = createVector(
// //         radii[i] + j * cos(angles[i]),
// //         radii[i] + j * sin(angles[i]) * sin(angles[i]),
// //         radii[i] + j * cos(angles[i]) * cos(angles[i])
// //     );
// //   }
// // }

// run() {
//   this.particles.push(new Particle());
//   for (let particle of this.particles) {
//       angles = random(30, 380);
//       let j = 0;
//       for (let i = 0; i < numParticles; i++) {
//         radii[i] = radii[i] + PI/200;
//         this.position = createVector(
//           radii[i] + j * cos(angles[i]),
//           radii[i] + j * sin(angles[i]) * sin(angles[i]),
//           radii[i] + j * cos(angles[i]) * cos(angles[i])
//       );
//       // this.velocity.mult(1.01);
//       // this.position.add(this.velocity);
//       if (this.position.mag() > 200) {
//         this.position.normalize().mult(200); 
//       }
//   }
//     // particle.update();
//     particle.display();
//     console.log(particle);
//   }
// }
// }



    
  
  // p.update();
  // p.display();
  // particle_list.push(p);
  // if (p.isDead()) {
  //   background(255);
  // }
  // spiral_3d(intensity, waves);
  // Update UI elements
  // let displayDensity = int(map(densitySlider.value(), 3, 62, 1, 60));
  // density.html("Density value: " + displayDensity);
  // thetaMax.html("Theta Max value: " + thetaMaxSlider.value());

  // phiMax.html("Phi Max value: " + phiMaxSlider.value());
    
  // if (peakDetect.isDetected) {
  //   newCRo -= 80;
  // }
  // let j = (newTRo - newCRo) / 120;
  // newCRo += j;
  // console.log(newCRo)
  // rotateZ(newCRo);