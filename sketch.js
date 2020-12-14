let facemesh;
let video;
let predictions = [];
let mic
let myVoxell


function setup() {
	createCanvas(640, 480, WEBGL);
	mic = new p5.AudioIn()
	mic.start()
	video = createCapture(VIDEO);
	video.size(width, height);
	// initSound()

	facemesh = ml5.facemesh(video, modelReady);

	// This sets up an event that fills the global variable "predictions"
	// with an array every time new predictions are made
	facemesh.on("predict", results => {
		predictions = results;
	});

	// Hide the video element, and just show the canvas
	video.hide();
}

function modelReady() {
	console.log("Model ready!");
}

function draw() {
	// image(video, 0, 0, width, height);
	background(255)
	// We can call both functions to draw all keypoints
	
	let vol = mic.getLevel()
	let h = map (vol,0,1,10,25)
	
	

	push()
	translate(-width / 2, -height / 2)

	drawKeypoints(h);
	pop()
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints(size) {
	for (let i = 0; i < predictions.length; i += 1) {
		const keypoints = predictions[i].scaledMesh;


		const [x, y, z] = keypoints[10];

		// fill(97, 0, 255);
		// ellipse(x, y, 5, 5);
		noStroke()
		push()
		fill('red')
		translate(x, y, z)
		sphere(10)
		pop()

		fill('blue')

		// Draw facial keypoints.
		for (let j = 0; j < keypoints.length; j += 1) {
			const [x, y, z] = keypoints[j];

			// fill(97, 0, 255);
			// ellipse(x, y, 5, 5);
			push()
			translate(x, y, z)
			if (j%2>0){
				fill('blue')
			box(size)
			} else { 
				fill('red')
				sphere(5)
			}
			pop()
		}
	}
}
