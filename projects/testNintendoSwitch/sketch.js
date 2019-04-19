function setup(){
    createCanvas(600,600)
}

function draw() {
    if (keyIsPressed(38)) {
        fs = fullscreen()
        fullscreen(!fs)
    }

    background(150)
    textSize(40)
    textAlign(CENTER)
    text(keyCode, width/2, height/2)
}
