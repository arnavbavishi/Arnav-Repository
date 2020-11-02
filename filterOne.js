
// collision detection
let capture

function setup() {
// body...
let canvas = createCanvas(900, 900)
canvas.parent('p5container')
    //captureMode(CENTER)
    capture = createCapture()
    capture.hide()
}


function draw() {
// background('green')
//circle(300,900,50)
push()
fill(200,15,25)
circle(100,500,50)
fill(250,15,25)
circle(120,500,50)
fill(200,15,25)
circle(150,500,50)
pop()
//background(capture.get())
// push()
// image(capture,0,0)
// pop()
let step = 7
textAlign(CENTER, CENTER)
    //translate(500,500)
    for (var i = 0; i < capture.width; i += step) {
        for (var j = 0; j < capture.height; j += step) {
            let col = capture.get(i, j)
            let val = brightness(col)
            if (val < 50) {
                push()
                fill(0)
                textSize(step)

               //rect(i, j, step, step) // Dark 
               text("AB", i, j)

               pop()
           } 
           else {
               // fill(val,155,215)
                 ellipse(i, j, step+2, step)  //Background pixels
             }
         }    
     }
     stroke(0)
     strokeWeight(20)
    // for (i capture.width)
    // line(width/2,0,width/2,height)
    //fill('green')
    // noStroke()
    noStroke()
    let c = get(mouseX, mouseY)
    textSize(24)
    text(c, 50, 50)
    fill(255, 0, 0)
    let black = color(0, 0, 0, 255)
    // console.log(c)
    // console.log(black)
    if (c[0] <= 0 ) {

        fill(4,155,25)

        console.log('true')
    }
    circle(mouseX, mouseY, 10, 10)

}