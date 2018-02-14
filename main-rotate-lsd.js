
// Draw the bottle on buffer canvas
// haul it in and dras it with the function below
// Each image should get a specific angle depedning on the position on the circle it is.

// Bottle d element and original aspect ratio (w/h).
var dPath = 'M5.43.1c-.12.1-.19.33-.21.74a1.25,1.25,0,0,1-.1.46,3.71,3.71,0,0,0-.1.94C5,3,5,3.12,5.1,3.3a2.35,2.35,0,0,1,.07.78L4.76,15.25a2,2,0,0,1-.28,1.16,12.92,12.92,0,0,1-1,1.26A13.22,13.22,0,0,0,0,26.1V57.46c.1.81.52,2.08,1.17,2.35H14.79c.65-.27,1.07-1.54,1.17-2.35V26.1a13.22,13.22,0,0,0-3.47-8.43,8.34,8.34,0,0,1-1.08-1.39,1.73,1.73,0,0,1-.21-.94L10.8,4.08a1.94,1.94,0,0,1,.08-.78A2.42,2.42,0,0,0,11,2.24a3.71,3.71,0,0,0-.1-.94,1.11,1.11,0,0,1-.09-.46c0-.41-.1-.64-.22-.74A32.29,32.29,0,0,0,5.43.1ZM9.7,3.72H10V14.37H9.7Zm3.31,23V57.51h-.35V26.68Zm1.24,0V57.51h-.77V26.68Z'
var ar = 16/60;

// Set the Canvas up.
// var width = 750,
// 		height = 500;
var width = d3.select('#container').node().offsetWidth,
		height = d3.select('#container').node().offsetHeight;

// debugger

// TODO Set the control element's width or set the vertically.
// Style the bottles and background.


var canvas = d3.select('#container').append('canvas')
		.attr('width', width)
		.attr('height', height);

var context = canvas.node().getContext('2d');


// Functions

var utils = {

	drawImageRotate: function(ctx, img, x, y, width, height, deg){

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

	},
	drawCircle: function(ctx, cx, cy, r) {

	  ctx.beginPath();
	  ctx.lineWidth = 2;
	  ctx.strokeStyle = '#003300';
	  ctx.arc(cx, cy, r, 0, 2 * Math.PI, false);
	  ctx.stroke();

	},
	degreeToRadian: function(degree) {
		return Math.PI/180 * degree;
	},
	radianToDegree: function(radian) {
		return 	180/Math.PI * radian;
	}

}

var bottler = {

	bottle: undefined,

	nOrbits: 9,

	orbits: {},

	bottlesPerOrbit: 40,

	shapes: 'clockwise',

	factorScale: undefined,

	init: function() {

		this.bottle = this.makeBottle();

		this.factorScale = d3.scaleLinear()
		.domain([0, this.nOrbits-1])
		.range([0.2, 1])
		.clamp(true);

	},
	makeBottle: function() {

	  // Create the image
	  var bottleImg = document.createElement('canvas');
	  bottleImg.width = 16;
	  bottleImg.height = 60;
	  var contextbottleImg = bottleImg.getContext('2d');

	  contextbottleImg.beginPath();
	  contextbottleImg.fillStyle = '#722665';
	  var p = new Path2D(dPath)
	  contextbottleImg.fill(p);

	  return bottleImg;

	},
	setUpBottleOrbits(w, h, factor) {

		return {
			cx: w/2,
			cy: h/2,
			r: Math.round(Math.min(w, h) * factor)
		};

	},
	drawOrbits(change) {

		// For each bottle "ray" (I suppose),
		for (var i = 0; i < this.bottlesPerOrbit; i++) {

			// calculate the angle.
			var theta = i * 2*Math.PI / this.bottlesPerOrbit + change;
			var thetaCounter = i * 2*Math.PI / this.bottlesPerOrbit - change;

			var thetaSlow = i * 2*Math.PI / this.bottlesPerOrbit + 2*change;

			// For each orbit,
			for (var j = 0; j < this.orbits.length; j++) {

				switch(this.shapes) {

					case 'clockwise': 
						// Clockwise movement
						var thetaX = theta,
								thetaY = theta, 
								thetaBottle = theta; 
						break;

					case 'counter-clock': 
						// Counter clockwise movement
						var thetaX = thetaCounter,
								thetaY = thetaCounter, 
								thetaBottle = thetaCounter; 
						break;

					case 'opposite-linear':
						// Opposite linear movement
						var thetaX = j%2 ? thetaCounter : theta,
								thetaY = j%2 ? thetaCounter : theta,
								thetaBottle = j%2 ? thetaCounter : theta;
						break;

					case 'seasick-steve':
						// Opposite linear movement
						var thetaX = j%2 ? thetaCounter : theta,
								thetaY = j%2 ? thetaCounter : thetaSlow,
								thetaBottle = j%2 ? thetaCounter : theta;
						break;

					case 'cross-3d':
						// 3D crossing
						var thetaX = j%2 ? theta : thetaCounter,
								thetaY = j%2 ? thetaCounter : theta, 
								thetaBottle = j%2 ? theta : thetaCounter; 
						break;

					case 'center-vs-rest':
						// Center orbit against the rest
						var thetaX = j===0 ? theta : thetaCounter,
								thetaY = j===0 ? thetaCounter : theta, 
								thetaBottle = j===0 ? theta : thetaCounter; 
						break;

					case 'center-vs-boring-rest':
						// Center orbit against the boring rest
						var thetaX = j===0 ? theta : theta,
								thetaY = j===0 ? thetaCounter : theta, 
								thetaBottle = j===0 ? theta : theta; 
						break;

					case 'center-vs-linear':
						// Focus center linear
						var thetaX = j===0 ? thetaCounter : theta,
								thetaY = j===0 ? thetaCounter : theta, 
								thetaBottle = j===0 ? thetaCounter : theta; 
						break;

					case 'subtle-synaptic-implosion':
						// Synaptic implosions
						var thetaX = j%2 ? thetaCounter : theta,
								thetaY = j%2 ? thetaCounter : theta, 
								thetaBottle = j%2 ? theta : thetaCounter; 
						break;

					default: 
						var thetaX = theta,
								thetaY = theta, 
								thetaBottle = theta; 

				}


				// calculate the cartesian coordinates,
				var x = this.orbits[j].cx + Math.cos(thetaX) * this.orbits[j].r,
						y = this.orbits[j].cy + Math.sin(thetaY) * this.orbits[j].r;

				// draw the bottle on that orbit.
				utils.drawImageRotate(context, this.bottle, x, y, 7, 6/ar, utils.radianToDegree(thetaBottle)+45);

			}

		}

	}

}

function update(degreeChange) {

	// Clear.
	context.clearRect(0, 0, width, height);

	// Correcting for not rotating bottles around center.
	context.save();
	context.translate(0, -10); 

	context.fillStyle = '#993388';
	context.fillRect(0, 0, width, height)

	// Draw.
	var change = utils.degreeToRadian(degreeChange);
	bottler.drawOrbits(change);

	context.restore();

}



// Draw
// ----

// Create a bottle.
bottler.init();

// Set the speed.
var speed = 0.01;
d3.select('input[name=speed-crank').attr('value', speed);
d3.select('#current-speed').html('speed: ' + Math.round	(speed *1000)/1000)


// Produce array of objects to turn into circles.
bottler.orbits = d3.range(bottler.nOrbits).map(function(el) {

	return bottler.setUpBottleOrbits(width, height, bottler.factorScale(el))

});



// Animate
// -------

var timer = d3.timer(function(elapsed) {

	update(elapsed*speed)

});


// Interaction
// -----------

// Slider.
d3.select('input[name=speed-crank]').on('change', function() {

	timer.stop();
	speed = +this.value;
	d3.select('#current-speed').html('speed: ' + Math.round	(speed *1000)/1000)

	timer = d3.timer(function(elapsed) {
		update(elapsed*speed)
	});

	// Change radio button if you come from 'sine-accelerate'.
	if (bottler.shapes === 'sine-accelerate') {
		d3.select('input#clock').node().checked = true;
	}


});

// Radio buttons.
d3.selectAll('input[name=shapes]').on('change', function() {

	timer.stop();
	bottler.shapes = this.value;

	// Different logic for 'sine-accelerate'.
	if (bottler.shapes === 'sine-accelerate') {

		timer = d3.timer(function(elapsed) {
			var waveSpeed = 0.01 * Math.sin(2*Math.PI/100 * 0.01*elapsed + 4.8) + 0.01;
			update(elapsed*waveSpeed);
		});

		return;

	}


	timer = d3.timer(function(elapsed) {
		update(elapsed*speed)
	});

});





