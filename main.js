
// Set the Canvas up.

var width = 750,
		height = 500;

var canvas = d3.select('#container').append('canvas')
		.attr('width', width)
		.attr('height', height);

var context = canvas.node().getContext('2d');


function circle(cx, cy, r) {

  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = '#003300';
  context.arc(cx, cy, r, 0, 2 * Math.PI, false);
  context.stroke();

}


// Calculate a central circle.
var cxBig = width/2,
		cyBig = height/2,
		rBig = Math.min(width/2, height/2) * 0.8;

circle(cxBig, cyBig, rBig);

function degreeToRadian(degree) {
	return 2*Math.PI/360 * degree;
}


function drawSmallCircles(change) {
	
	// Draw center circles on big circle.
	var nCircles = 10,
			rSmall = 4;

	for (var i = 0; i < nCircles; i++) {
		
		var theta = i * 2*Math.PI / nCircles + change,
				x = cxBig + Math.cos(theta) * rBig,
				y = cyBig + Math.sin(theta) * rBig;

		circle(x, y, rSmall)
		triangle(x, y)

	}

}


function update(degreeChange) {

	context.clearRect(0, 0, width, height);
	circle(cxBig, cyBig, rBig);
	var change = degreeToRadian(degreeChange);
	drawSmallCircles(change);	

}


update(0)

// d3.timer(function(elapsed) {

// 	update(elapsed*0.01)

// })










