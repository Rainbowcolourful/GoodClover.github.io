function setup() {
    createCanvas(600,600)
    rad = width/2
    time = 0
    step = 0.01
    detail = TWO_PI/256
    loop = 2
}

function draw() {
    background(150)

    stroke(255)
    strokeWeight(5)
    if (time > loop || time < 0) {
        step *= -1
    }
    time += step
    beginShape()
    for (i=0; i<TWO_PI; i+=detail) {
        n = noise(i,time) * (rad)
        vertex( (width/2)+n*cos(i), (height/2)+n*sin(i) )
    }
    endShape(CLOSE)
}
