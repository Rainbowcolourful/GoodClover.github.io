function Spinner(r, x, y) {
    this.x = x
    this.y = y
    this.rot = 0
    this.speed = 0.02
    this.rad = r
    this.eX = 0
    this.eY = 0
    this.rotate = function() {
        if (isNaN(this.rot)) {
            console.log("Warn: NaN replaced with 0")
            this.rot = 0
        }
        this.rot += this.speed
        this.eX = this.rad * sin(this.rot)
        this.eY = this.rad * cos(this.rot)
    }
    this.draw = function() {
        strokeWeight(2)
        circle(this.x, this.y, this.rad*2, this.rad*2)
        strokeWeight(10)
        point(this.x+this.eX, this.y+this.eY)
    }
}

function setup() {
    createCanvas(600,600)
    leftSpeedInput = document.getElementById("leftSpeedInput")
    topSpeedInput = document.getElementById("topSpeedInput")

    leftSpeedInput.value = 0.02
    topSpeedInput.value = 0.02

    leftRadInput.value = 50
    topRadInput.value = 50

    points = []
    leftSpinner = new Spinner(50,      70,height/2)
    topSpinner  = new Spinner(50, width/2,70)
}

function draw() {
    background(150)

    if (mouseIsPressed) {
        points = []
        leftSpinner = new Spinner(50,      70,height/2)
        topSpinner  = new Spinner(50, width/2,70)
    }

    leftSpinner.speed = parseFloat(leftSpeedInput.value)
    topSpinner.speed = parseFloat(topSpeedInput.value)

    leftSpinner.rad = parseFloat(leftRadInput.value)
    topSpinner.rad = parseFloat(topRadInput.value)

    leftSpinner.rotate()
    topSpinner.rotate()

    points.unshift(createVector(topSpinner.x+topSpinner.eX, leftSpinner.y+leftSpinner.eY))

    noFill()
    stroke(255)

    leftSpinner.draw()
    topSpinner.draw()

    strokeWeight(2)
    for (i in points) {
        //Cool size change:
        //strokeWeight( (points[i].x-topSpinner.x+topSpinner.rad)/3 )

        //point(points[i].x, points[i].y)

        //Lines to fill in gaps:
        if (i > 0) {
            line(points[i].x, points[i].y, points[i-1].x, points[i-1].y)
        }
    }
    stroke(255,150,150)
    strokeWeight(10)
    point(points[0].x, points[0].y)
}
