console.log('headtrack{}') 

//goal
//to creaye shapes 
//put them on the head
// make them react to sound



let  canvas, capture 
let mic
// poseNet Variables
let vid
let noseX = noseY = rightHandX = rightHandY = leftHandX = leftHandY = leftEyeX = leftEyeY = rightEyeX = rightEyeY = 0
let img;
let poseNet;
let poses = [];
let pixelz = []
let numPixels = 24

function setup() {
	
	canvas = createCanvas(640, 480, WEBGL);
	canvas.parent('p5container');
	capture = loadPoseNet()
	loadSoundlibrary()
	for (var i = 0; i < numPixels; i++){
		let x = random(-100,100)
		let y = random(-100,100)
		let z = random(-100,100)
		let r = random(1,100)
		
		pixelz.push(createPxxl(x,y,z,r))
		
	}

}

function draw() {
	

	console.log(JSON.stringify(mic,null,4))
	// background(vid.get())
	background(255)
	
	// fill('red')
	noFill()
	stroke('red')

	
	let r = mic.getLevel()+1
	console.log('position', noseX + ', ' + noseY + ',' + r)
	
	
	
	
	// ellipse(noseX,noseY,r,r)
	// noStroke()
	push()
	translate(-width/2,-height/2,0)
	image(capture.get(),0,0)
	translate(noseX,noseY,0)
	for (i = 0; i < pixelz.length; i++){
		let pxl = pixelz[i]
		pxl.display(r)
	}
	pop()

}

function createPxxl(x,y,z,radius){
	
	let obj = {}
	obj.x = x
	obj.y = y
	obj.z = z
	obj.r = radius 

	obj.display = function(t){
		
		push()
		translate(this.x,this.y,this.z)
		sphere(this.r*t)
		pop()
		
	}
return obj
}

function head(x,y,z,radius){
	
	let obj = {}
	obj.x = x
	obj.y = y
	obj.z = z
	obj.width = width

	obj.display = function(){
		
		push()
		translate(this.x,this.y,this.z)
		fill(0,0,200)
		rotateY(frameCount*0.01)
		rotateZ(frameCount*0.01)
		box (this.width)
	  
			// rotateZ(frameCount/100)
		
		pop()
		
	}
return obj
}

function loadSoundlibrary(){
	
		mic = new p5.AudioIn();
  mic.start();
	mic.normalize = true 
  fft = new p5.FFT();
  fft.setInput(mic);

	
}



										// dont touch this code here 




function loadPoseNet() {

	let vid = createCapture(640, 480)
	vid.hide()
	poseNet = ml5.poseNet(vid, modelLoaded);

	// set some options
	let options = {
		imageScaleFactor: 1,
		minConfidence: 0.25
	}

	// Listen to new 'pose' events
	poseNet.on("pose", function(results) {

		poses = results;
		if (!poses[0]) return
		let pose = poses[0].pose

		if (pose) {

			noseX = updateValue('nose', 'x', pose, noseX)
			noseY = updateValue('nose', 'y', pose, noseY)
			rightHandX = updateValue('rightWrist', 'x', pose, rightHandX)
			rightHandY = updateValue('rightWrist', 'y', pose, rightHandY)
			leftHandX = updateValue('leftWrist', 'x', pose, leftHandX)
			leftHandY = updateValue('leftWrist', 'y', pose, leftHandY)
			leftEyeX = updateValue('leftEye', 'x', pose, leftEyeX)
			leftEyeY = updateValue('leftEye', 'y', pose, leftEyeY)
			rightEyeX = updateValue('rightEye', 'x', pose, rightEyeX)
			rightEyeY = updateValue('rightEye', 'y', pose, rightEyeY)

		}


	});
	
	return vid 

}

function updateValue(key1, key2, kp, curr) {


	if (kp[key1].confidence > 0.2) {
		return (kp[key1][key2] - curr) * 0.5 + curr
	}



	return curr

}

function modelLoaded() {
	console.log('model is loaded')
}