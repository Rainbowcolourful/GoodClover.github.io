function pos(n) {
	if (n < 0) {
		n *= -1
	}
	return n
}

class Grain {
    constructor(x,y, m) {
    	this.pos = createVector(x,y)
    	this.vel = createVector(0,0)
    	this.acc = createVector(0,0)
        this.mass = m
    }
	dist(other) {
		return sqrt( pos(other.x-this.pos.x)**2 + pos(other.y-this.pos.y)**2 )
	}
    draw() {
        stroke(205, 203, 158)
        strokeWeight(this.mass*2)
        noFill()
        point(this.pos.x, this.pos.y)
    }
	update(sand) {
        this.acc.y += GRAV

        //Collision
        var hasCollid = false
        for (grain of sand) {
            if (this.dist(grain.pos) - this.mass - grain.mass <= 0 && grain != this) {
                hasCollid = true
                var mX = (grain.pos.x-this.pos.x -this.mass -grain.mass)/4
                var mY = (grain.pos.y-this.pos.y -this.mass -grain.mass)/4
                if (this.pos.x > grain.pos.x) {
                    this.pos.x -= mX
                    grain.pos.x += mX
                } else {
                    this.pos.x += mX
                    grain.pos.x -= mX
                }
                if (this.pos.y > grain.pos.y) {
                    this.pos.y -= mY
                    grain.posyx += mY
                } else {
                    this.pos.y += mY
                    grain.pos.y -= mY
                }
                var momX = (this.vel.x*this.mass + grain.vel.x*grain.mass)/4
                var momY = (this.vel.y*this.mass + grain.vel.y*grain.mass)/4
                this.acc.x = -momX/this.mass
                this.acc.y = -momY/this.mass
                grain.acc.x = -momX/grain.mass
                grain.acc.y = -momY/grain.mass
            }
        }

		//Physics
		this.vel.add(this.acc)

		this.acc.mult(0)

        this.pos.add(this.vel)

		//Off screen
		if (this.pos.x < 0 || this.pos.x > width) {
            this.pos.x = constrain(this.pos.x, 0,width)
            this.vel.x *= -0.25
		}
		if (this.pos.y < 0 || this.pos.y > height) {
            this.pos.y = constrain(this.pos.y, 0,height)
            this.vel.y *= -0.25
		}
	}
}

function setup() {
	createCanvas(600,600)
    cursor("none")
    GRAV = 1
    sand = []
    size = 4
    prevMillis = 0
}

function draw() {
    if (millis()-prevMillis > 125) {
        sand.push(new Grain(width/2+random(-25,25), size, size))
        prevMillis = millis()
    }

	background(150)

	for (grain of sand) {
        grain.draw()
		grain.update(sand)
	}

	stroke(255,10,100)
    strokeWeight(15)
	point(mouseX, mouseY)
}

function mousePressed() {
    sand.push(new Grain(mouseX, mouseY, size))
}
