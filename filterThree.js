

let mic;

function setup(){

	let canvas = createCanvas(300,300);
	canvas.parent('p5container');
	mic = new p5.AudioIn();
	mic.start();
}

// function draw(){

// 	background(0);
// 	var vol = mic.getlevel();
// 	ellipse(100,100,200,vol*200);

// }