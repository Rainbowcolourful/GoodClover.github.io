class Circle {
    constructor(x,y, r) {
        this.x = x
        this.y = y
        this.rad = r
    }
    dista(x,y) {
        return sqrt( (this.x-x)**2 + (this.y-y)**2 ) - this.rad
    }
}

function setup() {
    angleMode(DEGREES)
    createCanvas(600,600)
    pos = createVector(0,0)
    noCursor()
    start = 0
    end = 45
    step = 2
    scene = []
}

function draw() {
    console.log("Frame")
    background(150)

    for (obj of scene) {
        circle(obj.x, obj.y, obj.rad)
    }

    stroke(175)
    strokeWeight(3)
    //for (i=start; i<end; i+=step) {
    i = 0
    if (true) {
        push()
        rotate(i)
        x = mouseX
        y = mouseY
        a = 0
        len = width/2
        line(mouseX, mouseY, mouseX+len,mouseY)
        rad = len
        while (rad > 1 && a < len) {
            rad = len
            for (obj of scene) {
                dista = obj.dista(x,y)
                if (dista < rad) {
                    rad = dista
                }
            }
            circle(x+a,y, rad)
            a += rad
        }
        stroke(255)
        strokeWeight(10)
        point(x+a,y)
        pop()
    }

    noFill()
    stroke(200)
    strokeWeight(10)
    point(mouseX, mouseY)
}

function mousePressed() {
    scene.push(new Circle(mouseX, mouseY, 50))
}
