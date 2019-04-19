function setup(){
    createCanvas(600,600)
    L_UP = 38
    L_DOWN = 40
    L_LEFT = 37
    L_RIGHT = 39
    pos = createVector(width/2, height/2)
}

function draw() {
    background(150)

    if (gamepadAPI.buttonPressed("A")) {
        pos.x += 5
        pos.y += 5
    }


    noFill()
    textSize(40)
    textAlign(CENTER)

    text(keyCode, width/2, height/2)

    stroke(255)
    strokeWeight(20)
    point(pos.x, pos.y)
}
