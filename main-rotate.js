
// Draw the bottle on buffer canvas
// haul it in and dras it with the function below
// Each image should get a specific angle depedning on the position on the circle it is.

// Bottle d element and original aspect ratio (w/h).
var dPath = 'M5.43.1c-.12.1-.19.33-.21.74a1.25,1.25,0,0,1-.1.46,3.71,3.71,0,0,0-.1.94C5,3,5,3.12,5.1,3.3a2.35,2.35,0,0,1,.07.78L4.76,15.25a2,2,0,0,1-.28,1.16,12.92,12.92,0,0,1-1,1.26A13.22,13.22,0,0,0,0,26.1V57.46c.1.81.52,2.08,1.17,2.35H14.79c.65-.27,1.07-1.54,1.17-2.35V26.1a13.22,13.22,0,0,0-3.47-8.43,8.34,8.34,0,0,1-1.08-1.39,1.73,1.73,0,0,1-.21-.94L10.8,4.08a1.94,1.94,0,0,1,.08-.78A2.42,2.42,0,0,0,11,2.24a3.71,3.71,0,0,0-.1-.94,1.11,1.11,0,0,1-.09-.46c0-.41-.1-.64-.22-.74A32.29,32.29,0,0,0,5.43.1ZM9.7,3.72H10V14.37H9.7Zm3.31,23V57.51h-.35V26.68Zm1.24,0V57.51h-.77V26.68Z'
var aspectRatio = 16/60;

// Set the Canvas up.
var width = 750,
		height = 500;

var canvas = d3.select('#container').append('canvas')
		.attr('width', width)
		.attr('height', height);

var context = canvas.node().getContext('2d');

// Make functions.
function drawImageRot(ctx, img, x, y, width, height, deg){

  //Convert degrees to radian
  var rad = deg * Math.PI / 180;

  //Set the origin to the center of the image
  ctx.translate(x + width / 2, y + height / 2);

  //Rotate the canvas around the origin
  ctx.rotate(rad);

  //draw the image
  ctx.drawImage(img, -(width / 2), -(height / 2), width, height);

  //reset the canvas
  ctx.rotate(-rad);
  ctx.translate(-(x + width / 2), -(y + height / 2));

}

function makeBottle() {

  // Create the image
  var bottleImg = document.createElement('canvas');
  bottleImg.width = 16;
  bottleImg.height = 60;
  var contextbottleImg = bottleImg.getContext('2d');

  contextbottleImg.beginPath();
  contextbottleImg.fillStyle = 'tomato';
  var p = new Path2D(dPath)
  contextbottleImg.fill(p);

  return bottleImg;

}

function circle(cx, cy, r) {

  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = '#003300';
  context.arc(cx, cy, r, 0, 2 * Math.PI, false);
  context.stroke();

}

function degreeToRadian(degree) {
	return Math.PI/180 * degree;
}

function radianToDegree(radian) {
	return 	180/Math.PI * radian;
}



function drawBottles(change) {


	// Draw center circles on big circle.
	var nCircles = 40;

	for (var i = 0; i < nCircles; i++) {

		// Angle.
		var theta = i * 2*Math.PI / nCircles + change;
		var thetaCounter = i * 2*Math.PI / nCircles - change;


		// Planar coordinates.
		var x00 = cx00 + Math.cos(theta) * r00,
				y00 = cy00 + Math.sin(theta) * r00;

		drawImageRot(context, bottle, x00, y00, 5, 5/aspectRatio, radianToDegree(theta)+45)

		var x01 = cx01 + Math.cos(theta) * r01,
				y01 = cy01 + Math.sin(theta) * r01;

		drawImageRot(context, bottle, x01, y01, 5, 5/aspectRatio, radianToDegree(theta)+45)

		var x02 = cx02 + Math.cos(theta) * r02,
				y02 = cy02 + Math.sin(theta) * r02;

		drawImageRot(context, bottle, x02, y02, 5, 5/aspectRatio, radianToDegree(theta)+45)

		var x03 = cx03 + Math.cos(theta) * r03,
				y03 = cy03 + Math.sin(theta) * r03;

		drawImageRot(context, bottle, x03, y03, 5, 5/aspectRatio, radianToDegree(theta)+45)

		var x04 = cx04 + Math.cos(theta) * r04,
				y04 = cy04 + Math.sin(theta) * r04;

		drawImageRot(context, bottle, x04, y04, 5, 5/aspectRatio, radianToDegree(theta)+45)

		var x05 = cx05 + Math.cos(theta) * r05,
				y05 = cy05 + Math.sin(theta) * r05;

		drawImageRot(context, bottle, x05, y05, 5, 5/aspectRatio, radianToDegree(theta)+45)

		var x06 = cx06 + Math.cos(theta) * r06,
				y06 = cy06 + Math.sin(thetaCounter) * r06;

		drawImageRot(context, bottle, x06, y06, 5, 5/aspectRatio, radianToDegree(theta)+45)


	}

}


function update(degreeChange) {

	context.clearRect(0, 0, width, height);

	// context.save()
	// context.translate(0, -40)

	// circle(cx00, cy00, r00);
	// circle(cx01, cy01, r01);
	// circle(cx02, cy02, r02);
	// circle(cx03, cy03, r03);
	// circle(cx04, cy04, r04);
	// circle(cx05, cy05, r05);
	// circle(cx06, cy06, r06);

	var change = degreeToRadian(degreeChange);
	drawBottles(change);
	// context.restore()

}


// Draw.

// Make a bottle image.

var bottle = makeBottle();

// Calculate central circles.

var cx00 = width/2,
		cy00 = height/2,
		r00 = Math.min(width, height) * 0.8;

var cx01 = width/2,
		cy01 = height/2,
		r01 = Math.min(width, height) * 0.7;

var cx02 = width/2,
		cy02 = height/2,
		r02 = Math.min(width, height) * 0.6;

var cx03 = width/2,
		cy03 = height/2,
		r03 = Math.min(width, height) * 0.5;

var cx04 = width/2,
		cy04 = height/2,
		r04 = Math.min(width, height) * 0.4;

var cx05 = width/2,
		cy05 = height/2,
		r05 = Math.min(width, height) * 0.3;

var cx06 = width/2,
		cy06 = height/2,
		r06 = Math.min(width, height) * 0.2;



debugger




// Animate.

d3.timer(function(elapsed) {

	// console.log(elapsed);

	update(elapsed*0.01)


})










