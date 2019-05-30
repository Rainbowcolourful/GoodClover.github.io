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

        //Resistance
        this.acc.sub(this.vel.x*res, this.vel.y*res)

		//Physics
		this.vel.add(this.acc)

		this.acc.mult(0)

        //Collision
        if (this.pos.x > po.x && this.pos.x < po.x+ra) {
            if (this.pos.y > po.y && this.pos.y < po.y+ra) {
                console.log("Yeah")
                this.vel.mult(0)
                if (this.pos.x < po.x+ra/2) {
                    this.pos.x = po.x
                } else {
                    this.pos.x = po.x+ra
                }
                if (this.pos.y < po.y+ra/2) {
                    this.pos.y = po.y
                } else {
                    this.pos.y = po.y+ra
                }
            }
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
            }
        }
        if (next) {
            if (this.dist(next.pos) > wantDist) {
                this.acc.x += (next.pos.x-this.pos.x)/elast
                this.acc.y += (next.pos.y-this.pos.y)/elast
            }
        }
        this.pos.x = constrain(this.pos.x, 0,width)
        this.pos.y = constrain(this.pos.y, 0,height)

        //Pinning
        if (cloth.indexOf(this) == 0) {
            this.pos = createVector(50,50)
        } else if (cloth.indexOf(this) == cloth.length-1) {
            this.pos = createVector(width-50,50)
        }
	}
}

function setup() {
	createCanvas(600,600)
    cursor("none")
    GRAV = 3
    cloth = []
    wantDist = 20
    elast = 4
    res = 0.4
	for (i=50; i < width-50; i += wantDist) {
		cloth.push( new Point(i,0, 10) )
	}
    po = createVector(width/2, height/2)
    ra = 100
}

function draw() {
	background(150)

	for (p of cloth) {
        p.draw()
		p.update()
	}

    noStroke()
    fill(125)
    rect(po.x,po.y, ra,ra)

	stroke(50,200,50)
    strokeWeight(10)
	point(mouseX, mouseY)
    po.x = mouseX-ra/2
    po.y = mouseY-ra/2
}
