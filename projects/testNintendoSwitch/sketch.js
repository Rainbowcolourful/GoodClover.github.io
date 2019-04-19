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

    if (keyPressed(L_UP)) {
        pos.y -= 1
    } else if (keyPressed(L_DOWN)) {
        pos.y += 1
    }
    if (keyPressed(L_LEFT)) {
        pos.x -= 1
    } else if (keyPressed(L_RIGHT)) {
        pos.x += 1
    }


    noFill()
    textSize(40)
    textAlign(CENTER)

    text(keyCode, width/2, height/2)



    point(pos.x, pos.y)
}
