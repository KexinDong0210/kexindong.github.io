var cursors = [];
var x;
var y;
var r;
var g;
var b;
var who;  

let channelName = "clickCircles";

var url = new URL(window.location.href);
var you = url.searchParams.get("you");
var redVal = url.searchParams.get("r");
var greenVal = url.searchParams.get("g");
var blueVal = url.searchParams.get("b");

console.log(you);
console.log(redVal);
console.log(greenVal);
console.log(blueVal);

createServer(you); 


function setup() {
    createCanvas(windowWidth, windowHeight);
    fill(204, 101, 192, 127);
    stroke(0);
    ellipse(300, 300, 300, 300);
    dataServer.addListener({ message: readIncoming});
    dataServer.subscribe({ channels: [channelName] });

    new allCursors(mouseX, mouseY, redVal, greenVal, blueVal, you);
  
  }
  
  function createRandomColor() {
    colorMode(HSB);

    let h = random(360); 
    let s = random(60); 
    let b = 80 + random(20); 
    return color(h, s, b); 
}


function draw() {
  background(255);

  sendTheMessage(); 

  for (let i = 0; i < cursors.length; i++) { 
    noStroke(0);
    fill(cursors[i].r,cursors[i].g,cursors[i].b)
    ellipse(cursors[i].x, cursors[i].y, 60, 40);
    triangle(cursors[i].X+25, cursors[i].Y, cursors[i].X+50, cursors[i].Y-15, cursors[i].X+50, cursors[i].Y+15);
    textSize(20);
    textAlign(CENTER);
    fill(255-cursors[i].r,255-cursors[i].g,255-cursors[i].b); 
    text(cursors[i].who, cursors[i].x, cursors[i].y+5);
 
  }
  
}
function mousePressed(){ 
	noLoop();
	let c = createRandomColor(); 
  fill(c);
	ellipse(mouseX, mouseY, 60, 40);
	triangle(mouseX+25,mouseY,mouseX+50,mouseY-15,mouseX+50,mouseY+15);
	
	fill(0,0,0);
	circle(mouseX-20,mouseY-3,5)
}


  
function sendTheMessage() {


  dataServer.publish({
    channel: channelName,
    message: {
      x: mouseX,
      y: mouseY,
      r: redVal, 
      g: greenVal,
      b: blueVal
    },
  });
}

function readIncoming(inMessage) {


  /*since an App can have many channels, we ensure that we are listening
  to the correct channel */

  if (inMessage.channel == channelName) {

   x = inMessage.message.x; 
   y = inMessage.message.y; 
   r = inMessage.message.r; 
   g = inMessage.message.g; 
   b = inMessage.message.b; 
   who = inMessage.publisher; 

   let newinput = true; // we are checking to see if this person who sent the message is already on the page. 

      for(let i = 0; i<cursors.length;i++) { 
        if(who==cursors[i].who) { 
          cursors[i].x = x;
          cursors[i].y = y;
          newinput = false;    
        }
      }
      if(newinput) { 
        cursors.push(new allCursors(x,y,r,g,b,who));
      }
  }
}
function allCursors(x,y,r,g,b,who){ 
 
  this.x = x; // this is shorthand for saying "this object"
  this.y = y;
  this.r = r;
  this.g = g;
  this.b = b;
  this.who = who;

}
