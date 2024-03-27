// let xOff = 0;
// let yOff = 1;
// let zOff = 2;

let intensity = 0;
let waves = 0;
var song;
var fft;
let spectrum;
let fov;
let cameraZ;
var camX;
let camY;
let camZ;
let ease;
let newTRo = 0;
let newCRo = 0;
let framesToRotate = 100;
let newframesToRotate = 200;
let waveform;
let rotateOp = false;
let speed = 100;
let approachingSpeed = 2;
let angles = [];
let numParticles = 50;
let numRings = 4;

var position;
let particle;
let particles = [];
let particleSystem;
let buffers = [];
// let location;
// let velocity;
// let accelerator;



let r = 200;
let density;
let densitySlider;
let t = 0;

var w = window.innerWidth;
var h = window.innerHeight;

let audioFile;


function preload() {
//   audioFile = document.getElementById("input").files[0];
  song = loadSound('./assets/lust.mpeg');
}

function setup() {
  createCanvas(w, h, WEBGL);
  
  fft = new p5.FFT(0.8, 1024);
  peakDetect = new p5.PeakDetect();
  waveform = fft.waveform();
  
  angleMode(DEGREES);
  colorMode(HSB);
  // document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

  stroke(199, 80, 88);
  ambientLight(200);
  strokeWeight(2.7);
  particlesystem();
  
  // let vertices = bumpySphere(intensity, peakDetect);


  // Create buffers for each ring of particles
  
}
  
  // stroke(0);
  
   //Particlesystem is initialized with the starting positions



function draw() {

    
  // Check if the song is playing
  if (song.isPlaying()) {
    
    camX = map(mouseX, 0, width, 100, 200);
    camY = map(mouseY, 0, height/4, 100, 200);
    camera(camX, camY, 0, 0, 0, 0, 0, 1, 0);
    let fov = map(mouseX, width / 2, width, 0, 360);
    let cameraZ = (height) / tan((360 / 3));
    perspective(fov, width / height, 10, 1000);
    // fill(random(255),random(255),random(255));
    
    // Analyze the audio spectrum

    spectrum = fft.analyze();
    peakDetect.update(fft);
    
    // Calculate intensity based on the average spectrum value
    let sum = 0;
    let total = 0;
    for (let i = 0; i < spectrum.length; i++) {
      sum += spectrum[i];
    }
    for (let j = 0; j < waveform.length; j++) {
      total += waveform[j];
    }
    waves = map(total/waveform.length, -1, 1, 0, 1);
    intensity = map(sum / spectrum.length, 0, 255, 0, 1);
  }
  
  bumpySphere(intensity, peakDetect);
  for (let particleRing of particles) {
    // console.log(particleRing);
    for (let particle of particleRing) {
      particle.update(); 
      particle.display(); 
    }
  }  
}

//   rotateY(millis() / 10000);
//   sphere(300);


function normalSphere() {
  for (let phi = 0; phi < phiMaxSlider.value(); phi += 180/densitySlider.value()) {
    beginShape(POINTS);
    for(let theta = 0; theta < thetaMaxSlider.value(); theta += 5) {
        let x = r * cos(phi);
        let y = r * sin(phi) * sin(theta);
        let z = r * sin(phi) * cos(theta);
        vertex(x, y, z);
    }
    endShape();
  }
}

function sphericalSpiral() {
    beginShape(POINTS);
    for(let theta = 0; theta < thetaMaxSlider.value()/2; theta += 0.1) {
        let x = r * cos(theta);
        let y = r * sin(theta) * sin(theta* densitySlider.value());
        let z = r * sin(theta) * cos(theta * densitySlider.value());
        vertex(x, y, z);
    }
    endShape();
  }

  function spiral_3d(intensity, waves) {
    beginShape(POINTS);
    for(let theta = 0; theta < 360; theta += 0.1) {
        let x = r * cos(theta * (intensity));
        let y = r * sin(theta * (intensity )) * sin(theta* waves);
        let z = r * sin(theta * (intensity)) * cos(theta * waves);
        vertex(x, y, z);
    }
    endShape();
  }

  function bumpySphere(intensity, peakDetect) {
    let vertices = [];
    clear();
    
    if (song.isPlaying()) {
    if (peakDetect.isDetected) {
    newTRo -= 80;
    }
    let j = newTRo / 5000;
    newTRo += j;
    ease = sqrt(0.005);
    newCRo = lerp(newCRo, newTRo, abs(ease));
    rotateY(newCRo);
  
  }
  // background(230, 50, 15);
  orbitControl(2, 2);
  for (let phi = 0; phi < 180; phi += 2) {
    beginShape(POINTS);
    for (let theta = 0; theta < 360; theta += 2) {     
      let x = (r * (1 + ((intensity * 3)) * sin(theta * 5) * sin(phi * 6))) * sin(phi) * cos(theta);
      let y = (r * (1 + ((intensity * 3)) * sin(theta * 5) * sin(phi * 6))) * sin(phi) * sin(theta);
      let z = (r * (1 + ((intensity * 3)) * sin(theta * 5) * sin(phi * 6))) * cos(phi);
      
      vertex(x, y, z);
      vertices.push(createVector(x, y, z));
    }
    endShape();
  }
  return vertices;
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file.type === 'audio') {
    const reader = new FileReader();
    reader.onload = function(event) {
      loadSound(event.target.result, onLoad, onError);
    };
    reader.readAsDataURL(file);
  } else {
    console.error('Unsupported file type. Please select an audio file.');
  }
}

function onLoad() {
  console.log('Audio file loaded successfully.');
  song.play(); // Start playing the audio file
}

function onError() {
  console.error('Error loading audio file.');
}



class Particle {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.velocity = p5.Vector.random3D();
    this.rotationAngle = 0;
    this.rotationSpeed = 1;
    // this.acceleration = createVector(x, y, z);
  }

  update() {
    // this.velocity.add(this.acceleration);
      this.velocity.mult(1.05);
      
      this.position.add(this.velocity);
      let axis = createVector(0, 0, 1);
      this.rotationAngle += this.rotationSpeed;
      this.position.rotate(this.rotationAngle, axis);
      if (this.position.mag() > 400) {
        this.position.normalize().mult(400);
      }
  }

  display() {
    push();
    translate(this.position);
    // stroke(214, 99, 54);
    stroke(255);
    strokeWeight(2);
    fill(199, 80, 88);
    // fill(214, 99, 54);
    ellipse(0, 0, 2.7, 2.7);
    // rotateY(20);
    pop();
  }
}

function particlesystem () {
  var vertices = bumpySphere(intensity, peakDetect);
  let angleOffsets = [];
  // let tiltAngle = [];
  for (let ring = 0; ring < numRings; ring++) {
    angleOffsets.push(ring * TWO_PI / numRings);
  }

  // for (let i = 0; i < numParticles; i++) {
  //   tiltAngle.push(random(0, 2 * PI));
  // }

  for (let ring = 0; ring < numRings; ring++) {
    var particleRing = [];
    let angleOffset = angleOffsets[ring];

    for (let i = 0; i < numParticles; i++) {
      let index = floor(i * vertices.length / numParticles);
      let vert = vertices[index];
      let angle = i * TWO_PI / numParticles + angleOffset;
      

      let x = vert.x + cos(angle) * cos(angle) * (1000);
      let y = vert.y + sin(angle) * sin(angle) * (1000);
      let z = vert.z;

      particleRing.push(new Particle(x, y, z));
      console.log(9)
  }

  particles.push(particleRing);
}


  
}

