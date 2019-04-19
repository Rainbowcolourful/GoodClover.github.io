function Obj(x,y, w,h) {
	this.pos = createVector(x,y)
	this.size = createVector(w,h)
	this.vel = createVector(0,0)
	this.acc = createVector(0,0)
    this.draw = function(round=0) {
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y, round)
    }
	this.applyForce = function(force) {
		this.acc.add(force)
	}
	this.collidePoint = function(point) {
        if (point.x > this.pos.x & point.x < this.pos.x+this.size.x & point.y > this.pos.y & point.y < this.pos.y+this.size.y) {
            return true
        } else {
            return false
        }
	}
	this.update = function() {
		this.vel.add(this.acc)

		this.acc.mult(0)

		this.pos.add(this.vel)
	}
}

function setup() {
	createCanvas(600,600)
    center = createVector(width/2, height/2)
	leftBat  = new Obj(      30,height/2-50,  20,100)
	rightBat = new Obj(width-50,height/2-50,  20,100)
	leftScore = 0
	rightScore = 0
    ballStartSpeed = 7
	ball = new Obj(width/2,height/2, 20,20)
	ball.applyForce(createVector(random([-ballStartSpeed,ballStartSpeed]),0))
}

function draw() {
	background(150)

	if (keyIsDown(87)) {
		leftBat.pos.y -= 5
	} else if (keyIsDown(83)) {
		leftBat.pos.y += 5
	}

	if (keyIsDown(UP_ARROW)) {
		rightBat.pos.y -= 5
	} else if (keyIsDown(DOWN_ARROW)) {
		rightBat.pos.y += 5
	}

	leftBat.update()
	rightBat.update()
	ball.update()

    if (ball.pos.y < 0 || ball.pos.y+ball.size.y > height) {
        ball.vel.y *= -1
    }

	if (ball.pos.x < 0) {
		rightScore += 1
        ball = new Obj(width/2,height/2, 20,20)
        ball.applyForce(createVector(-ballStartSpeed, random(-2,2)))
	} else if (ball.pos.x+ball.size.x > width) {
		leftScore += 1
        ball = new Obj(width/2,height/2, 20,20)
        ball.applyForce(createVector(ballStartSpeed, random(-2,2)))
	}

    if (leftBat.collidePoint( ball.pos )) {
        ball.vel.x *= -1.025
        ball.vel.y = ((ball.pos.y+ball.size.y/2) - (leftBat.pos.y+leftBat.size.y/2)) /12
    } else if (rightBat.collidePoint( ball.pos )) {
        ball.vel.x *= -1.025
        ball.vel.y = ((ball.pos.y+ball.size.y/2) - (rightBat.pos.y+rightBat.size.y/2)) /12
    }

	noStroke()
	fill(0)
	leftBat.draw(4)
	rightBat.draw(4)

	fill(255)
	ball.draw(10) //10 for a round ball

	fill(100)
	textSize(40)
	textAlign(CENTER)
	text( leftScore,       40, 50)
	text(rightScore, width-40, 50)
}
