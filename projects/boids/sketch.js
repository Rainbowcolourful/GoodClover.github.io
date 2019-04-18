function pos(n) {
	if (n < 0) {
		n *= -1
	}
	return n
}

function Boid(x,y,xV,yV) {
	this.x = x
	this.y = y
	this.xVel = xV
	this.yVel = yV
	this.xAcc = 0
	this.yAcc = 0
	this.err = 0.05
	this.will = 0.25
	this.sight = 20
	this.dist = function(otherX, otherY) {
		return sqrt( pos(otherX-this.x)**2 + pos(otherY-this.y)**2 )
	}
	this.update = function(boids) {
		//Flocking
		av_xVel = 0
		av_yVel = 0
		av_amt = 0
		if (mouseBoid & this.dist(mouseX,mouseY) < this.sight) {
			av_amt += 1
			av_xVel += mouseXVel
			av_yVel += mouseYVel
		}
		for (boidI in boids) {
			if (this.dist(boids[boidI].x, boids[boidI].y) < this.sight) {
				av_amt += 1
				av_xVel += boids[boidI].xVel
				av_yVel += boids[boidI].yVel
			}
		}
		if (av_amt > 0) {
			av_xVel /= av_amt
			av_yVel /= av_amt
		}
		this.xAcc += (av_xVel-this.xVel)*this.will
		this.yAcc += (av_yVel-this.yVel)*this.will

		//Add a bit of error
		this.xAcc += random(-this.err, this.err)
		this.yAcc += random(-this.err, this.err)

		//Physics
		this.xVel += this.xAcc
		this.yVel += this.yAcc

		this.xAcc = 0
		this.yAcc = 0

		this.x += this.xVel
		this.y += this.yVel

		//Off screen
		if (this.x < 0 || this.x > width) {
			this.x = width-this.x
		}
		if (this.y < 0 || this.y > height) {
			this.y = width-this.y
		}
	}
}

function setup() {
	createCanvas(600,600)
	mouseBoid = true
	mouseXPrev = 0
	mouseYPrev = 0
	mouseXVel = 0
	mouseYVel = 0
	boids = []
	for (i=0; i < 75; i++) {
		boids.push(new Boid(random(width), random(height), random(-1,1), random(-1,1)))
	}
}

function draw() {
	mouseXVel = mouseX-mouseXPrev
	mouseYVel = mouseY-mouseYPrev
	background(150)
	stroke(50)
	strokeWeight(10)
	noFill()
	for (i in boids) {
		boids[i].update(boids)
		point(boids[i].x, boids[i].y)
	}
	stroke(10,10,100)
	point(mouseX, mouseY)
	mouseXPrev = mouseX
	mouseYPrev = mouseY
}