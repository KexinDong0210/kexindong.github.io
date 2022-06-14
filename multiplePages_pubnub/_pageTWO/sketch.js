
/**In this example, we use PubNub to connect to three pages, and show three different types of visualizations on each sketch. **/

let channelName = "page 2";
const drops = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let x = 0; x < width; x++) {
    drops[x] = random(height);
  }
  
  stroke(255);
}

function draw() {
  background(32);
  
  for(let x = 0; x < drops.length; x++) {
    drops[x] += random(5);
    if(drops[x] > height){
      drops[x] = 0;
    }
    
    point(x, drops[x]);
  }
}