var video;
var kissing;
var playing = true;
var playing2 = false;
var playing3 = false;



function preload(){
//    kissing = createVideo('assets/kissing.mov');
   upp = loadImage('assets/redbox.PNG');
   hey = loadImage('assets/hey.PNG');
   lips = loadImage('assets/lips.PNG');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  pixelDensity(1);

  //kissing video
  kissing = createVideo('video/video.mp4');
  kissing.size(windowWidth, windowHeight);
  kissing.volume(0);
  kissing.loop();
  kissing.hide();

  //webcam
  video = createCapture(VIDEO); //set up for web cam
  video.hide(); //hide dome camera
  console.log(video.width);
  console.log(video.height); 
  console.log(window.width);
  console.log(window.height);
    
}

function draw() {
  video.loadPixels();
  //background(255, 0, 0);
    
  //kissing video
  let img = kissing.get();
  image(img, 0, 0);

  //webcam distortion
  push();
  tint(255, 0, 0); //adding red tint and transparency to the video 
  imageMode(CENTER);
  translate(width, 0);
  scale(-1, 1);
  image(video, width/2, height/2, width/1.9, height/2, 200, 250, 200, 150);
  pop();
  //destinations: x. y.  w.  h. capture: x.  y    w.   h
  
  //texts
  if(playing)
  {
        push();
        imageMode(CENTER);
        image(upp, width/2, height/2);
        pop();
        
        textSize(20);
        fill(255, 255, 255);
        text("click the mouse to continue", width/2 , height/1.45);
        textAlign(CENTER, CENTER);
  }
  else
  {
       if(playing2){
        push();
        imageMode(CENTER);
        image(hey, width/2, height/2);
        pop();
        
        textSize(20);
        text("click the mouse to continue", width/2, height/1.5);
        fill(255, 255, 255);
        textAlign(CENTER, CENTER); 
      }
  }
 //else
 {
        if(playing3){
        push();
        imageMode(CENTER);
        image(lips, width/2, height/2);
        pop();
        
        textSize(60);
        text("click the mouse to continue", width/2, height/1.45);
        fill(255, 255, 255);
        textAlign(CENTER, CENTER); 
        
        }
        else{
        textSize(100);
        text("", width/2, height/2);
        textAlign(CENTER, CENTER); 
        }
 }
    
}

function mousePressed()
{
    playing = false;
    playing2 = !playing2;
    //playing3 = !playing3;
 
}


