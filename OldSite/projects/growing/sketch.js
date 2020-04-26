function pos(n) {
	if (n < 0) {
		n *= -1
	}
	return n
}

class Point {
    constructor() {
        var x
        var y
        var r = random([0,1,2,3])
        if (r == 0) {
            x = random(0,width)
            y = 0
        } else if (r == 1) {
            x = width
            y = random(0,height)
        } else if (r == 2) {
            x = random(0,width)
            y = height
        } else if (r == 3) {
            x = 0
            y = random(0,height)
        }
    	this.pos = createVector(x,y)
    	this.vel = createVector(0,0)
    	this.acc = createVector(0,0)
    }
	dist(other) {
		return sqrt( pos(other.x-this.pos.x)**2 + pos(other.y-this.pos.y)**2 )
	}
    draw() {
        stroke(50)
        strokeWeight(rad*2)
        noFill()
        point(this.pos.x, this.pos.y)
    }
	update(tree) {
        //Movement
        this.acc.add(random(-move,move), random(-move,move))

		//Physics
		this.vel.add(this.acc)

		this.acc.mult(0)

		this.pos.add(this.vel)

        //Collision
        for (p of tree) {
            if (this.dist(p) - rad*2 <= 0) {
                tree.push(this.pos)
                points.splice(points.indexOf(this), 1)
                break
            }
        }

		//Off screen
		if (this.pos.x < 0 || this.pos.x > width) {
            this.pos.x = constrain(this.pos.x, 0,width)
            this.vel.x *= -0.5
		}
		if (this.pos.y < 0 || this.pos.y > height) {
            this.pos.y = constrain(this.pos.y, 0,height)
            this.vel.y *= -0.5
		}
	}
}

function setup() {
	createCanvas(600,600)
    cursor("none")
    creation = false
    move = 0.1
    tree = [createVector(width/2, height/2)]
    points = []
    pointsAmt = 500
    rad = 5
	for (i=0; i < pointsAmt; i++) {
		points.push(new Point())
	}
}

function draw() {
	background(150)

	for (p of points) {
        p.draw()
		p.update(tree)
	}

    for (p of tree) {
        stroke(10,10,100)
    	strokeWeight(rad*2)
    	noFill()
        point(p.x, p.y)
    }

    if (creation) {
        while (points.length < pointsAmt) {
            points.push(new Point())
        }
    }

	stroke(255,10,100)
	point(mouseX, mouseY)
}

function keyPressed() {
    creation = !creation
}
