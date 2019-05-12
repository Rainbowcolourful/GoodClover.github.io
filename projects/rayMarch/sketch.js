function positive(n) {
    if (n < 0) {
        n *= -1
    }
    return n
}

class Circle {
    constructor(x,y, r) {
        this.x = x
        this.y = y
        this.r = r
    }
    dista(x,y) {
        return positive( sqrt( (this.x-x)**2 + (this.y-y)**2 ) - this.r )
    }
    draw() {
        fill(225)
        noStroke()
        circle(this.x, this.y, this.r*2)
    }
}

function setup() {
    angleMode(DEGREES)
    createCanvas(600,600)
    noCursor()
    sight = height/3
    scene = []
    drawSel = 0
}

function draw() {
    background(150)

    //for (obj of scene) {
    //    obj.draw()
    //}
    drawSel++
    if (drawSel > sight) {drawSel=-sight}
    for (currY = -sight; currY<sight; currY++) {
        stepX =
        stepY =
        currRad = width-mouseX
        currX = 0
        while (currRad > 1 && mouseX+currX < width) {
            currRad = width-(mouseX+currX)
            for (obj of scene) {
                temp = obj.dista(mouseX+currX, mouseY+currY)
                if (temp < currRad) {
                    currRad = temp
                }
            }
            if (drawSel == currY) {
                noFill()
                stroke(220)
                strokeWeight(2)
                circle(mouseX+currX, mouseY+currY, currRad*2)
            }
            currX += currRad
        }
        noFill()
        stroke(255)
        strokeWeight(10)
        point(mouseX+currX, mouseY+currY)
    }
    stroke(0,0,255)
    point(mouseX, mouseY)
}

function mousePressed() {
    scene.push(new Circle(mouseX, mouseY, 50))
}
