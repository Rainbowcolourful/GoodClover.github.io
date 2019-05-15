var socket

function setup() {
    createCanvas(600,600)

    scene = []

    weight = 20
    createDiv()
    weightSlider = createSlider(1,50, 20)

    colour = "#ffffff"
    createDiv()
    colourSel = createColorPicker("#ffffff")

    serverIP = "https://5.198.10.93:3000"

    socket = io.connect(serverIP)
    socket.on("mouse", function(data) {
        scene.push(data)
        console.log(data)
    })

    noCursor()
}

function draw(){
    weight = weightSlider.value()
    colour = colourSel.value()

    if (keyIsDown(32)) {
        colour = "#969696"
    } //Space

    background(150)

    noFill()
    for (p of scene) {
        stroke(p.c)
        strokeWeight(p.w)
        point(p.x, p.y)
    }

    noFill()
    stroke(colour)
    strokeWeight(weight)
    point(mouseX, mouseY)
}

function mouseDragged() {
    v = {
        x:mouseX, y:mouseY,
        w:weight,
        c:colour
    }
    scene.push(v)
    socket.emit("mouse", v)
}
