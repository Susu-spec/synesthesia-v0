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
let ease;
let newTRo = 0;
let newCRo = 0;
let framesToRotate = 100;
let newframesToRotate = 200;
let waveform;
let rotateOp = false;
let speed = 100;



let r = 200;
let density;
let densitySlider;
let t = 0;

var w = window.innerWidth;
var h = window.innerHeight;

let audioFile;




function preload() {
//   audioFile = document.getElementById("input").files[0];
  song = loadSound('./assets/jada.mpeg');
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
  // 
 
  // stroke(0);
  strokeWeight(2.7);
  
}



function draw() {

  // Check if the song is playing
  if (song.isPlaying()) {
    // let camZ = map(mouseX, 0, width, -200, 0);
    // let camY = map(mouseY, 0, height/4, 0, 200);
    // camera(0, 0, 0, 0, 0, 0, 0, 1, 0);
    let fov = map(mouseX, 0, width, 0, 360);
    let cameraZ = (height) / tan((360 / 3));
    perspective(fov, width / height, cameraZ / 10, cameraZ * 100);
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
    // console.log(intensity);
  }
  
  // Update the bumpy sphere visualization
  bumpySphere(intensity, peakDetect, waves);
  // spiral_3d(intensity, waves);
  // Update UI elements
  // let displayDensity = int(map(densitySlider.value(), 3, 62, 1, 60));
  // density.html("Density value: " + displayDensity);
  // thetaMax.html("Theta Max value: " + thetaMaxSlider.value());

  // phiMax.html("Phi Max value: " + phiMaxSlider.value());
}
  // control phi value 
  // normalSphere();
  // console.log(fft);
  // sphericalSpiral();
  // spiral_3d();
  

 
  
  // let displayDensity = int(map(densitySlider.value(), 3, 62, 1, 60));
  // density.html("Density value: " + displayDensity);




  // noStroke();
//   noFill();
//   stroke(0,255,0);
//   translate(noise(xOff)*100, noise(yOff)*height*0.01, -noise(zOff)*600);
//   rotateY(millis() / 10000);
//   sphere(300);
  
//   xOff+=0.001;
//   yOff+=0.001;
//   zOff+=0.001;


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

  function bumpySphere(intensity, peakDetect, waves) {
   
  // Clear previous frame
  clear();
  // let currentTime = millis();
  // let lastFrameTime = lastFrameMillis / 1000;
  // let dt = (currentTime - lastFrameMillis);
  // lastFrameMillis = currentTime;

  a = random(255);
  b = random(255);
  c = random(255);
  
 
  
  if (song.isPlaying()) {
    if (peakDetect.isDetected) {
    newTRo -= 80;
    // stroke(a, b, c);
    
    }
    let j = newTRo / 5000;
    newTRo += j;
    ease = sqrt(0.005);
    // console.log(ease);
    newCRo = lerp(newCRo, newTRo, abs(ease));
    rotateZ(newCRo);
  }
  

  
  // if (peakDetect.isDetected) {
  //   newCRo -= 80;
  // }
  // let j = (newTRo - newCRo) / 120;
  // newCRo += j;
  // console.log(newCRo)
  // rotateZ(newCRo);
  background(230, 50, 15);
  orbitControl(2, 2);
 
  for (let phi = 0; phi < 180; phi += 2) {
    beginShape(POINTS);
    // stroke(r, g, b);
    
    for (let theta = 0; theta < 360; theta += 2) {
      // stroke(r, g, b); 
     
      let x = (r * (1 + ((intensity * 10)) * sin(theta * 5) * sin(phi * 6))) * sin(phi) * cos(theta);
      let y = (r * (1 + ((intensity * 10)) * sin(theta * 5) * sin(phi * 6))) * sin(phi) * sin(theta);
      let z = (r * (1 + ((intensity * 10)) * sin(theta * 5) * sin(phi * 6))) * cos(phi);
      
      vertex(x, y, z);
    }
    endShape();
  }
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
