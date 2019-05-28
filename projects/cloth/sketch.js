function pos(n) {
	if (n < 0) {
		n *= -1
	}
	return n
}

class Point {
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
        noStroke()
        fill(80)
        circle(this.pos.x, this.pos.y, this.mass)

        var prev = cloth[cloth.indexOf(this)-1]
        if (prev) {
            noFill()
            stroke(120)
            strokeWeight(this.mass/2)
            line(prev.pos.x,prev.pos.y, this.pos.x,this.pos.y)
        }
    }
	update() {

        //Gravity
        this.acc.y += GRAV
		//Physics
		this.vel.add(this.acc)

		this.acc.mult(0)

        //Collision
        if (this.dist(po) -ra -this.mass <= 0) {
            this.vel.mult(0)
        }

        //MOVE
        this.pos.add(this.vel)

        //Stick
        var prev = cloth[cloth.indexOf(this)-1]
        var next = cloth[cloth.indexOf(this)+1]
        if (prev) {
            if (this.dist(prev.pos) > wantDist) {
                this.acc.x += (prev.pos.x-this.pos.x)/elast
                this.acc.y += (prev.pos.y-this.pos.y)/elast
                this.pos.x = constrain(this.pos.x, prev.pos.x-wantDist*32, prev.pos.x+wantDist*32)
                this.pos.y = constrain(this.pos.y, prev.pos.y-wantDist*32, prev.pos.y+wantDist*32)
            }
        }
        if (next) {
            if (this.dist(next.pos) > wantDist) {
                this.acc.x += (next.pos.x-this.pos.x)/elast
                this.acc.y += (next.pos.y-this.pos.y)/elast
                this.pos.x = constrain(this.pos.x, next.pos.x-wantDist*32, next.pos.x+wantDist*32)
                this.pos.y = constrain(this.pos.y, next.pos.y-wantDist*32, next.pos.y+wantDist*32)
            }
        }
        this.pos.x = constrain(this.pos.x, 0,width)
        this.pos.y = constrain(this.pos.y, 0,height)
	}
}

function setup() {
	createCanvas(600,600)
    cursor("none")
    GRAV = 0.5
    cloth = []
    wantDist = 15
    elast = 4
	for (i=50; i < width-50; i += wantDist) {
		cloth.push( new Point(i,0, 10) )
	}
    po = createVector(width/2, height/2)
    ra = 50
}

function draw() {
	background(150)

	for (p of cloth) {
        p.draw()
		p.update()
	}

    noStroke()
    fill(125)
    circle(po.x,po.y, ra*2)

	stroke(50,200,50)
    strokeWeight(10)
	point(mouseX, mouseY)
}
