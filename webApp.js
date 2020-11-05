let objects = [] // create empty array 
let mic, fft;


function setup() {

	createCanvas(windowWidth, windowHeight, WEBGL);
	
	mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
	
	let spacing = 50
	
	for (var x = -200; x < 200; x += spacing) {

		for (var y = -200; y < 200; y += spacing) {

			for (var z = -200; z < 200; z += spacing) {
				
				let voxel = getVoxel(x,y,z,spacing/2) 
				objects.push(voxel) 


			}
			
		}

	}
}

function draw() {
	background(0)
	
  let spectrum = fft.analyze();
	
	
	push()
	
	scale(0.5)
	// rotateX(mouseX/1000)
	rotateX(0)
	rotateY(frameCount*0.01)
	rotateZ(frameCount*0.01)
	
	for (let i = 0; i < objects.length; i++){
		
		let object = objects[i]
		object.size = map(spectrum[i], 0, 200, 100,1)
		

		object.display()
		
	}

	
	pop()
}


function getVoxel(x,y,z,size){
	
	let obj = {} 
	obj.x = x 
	obj.y = y 
	obj.z = z 
	obj.size = size
	obj.display = function(){
		push()
		fill(150,0,200)
		translate(this.x,this.y,this.z) 
		box(this.size) 
		pop()
		
	}
	
	return obj
	
}