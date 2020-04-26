function setup() {
    createCanvas(600,600)
    spacing = 15
    scene = {}
    for (x=0; x<width+1; x+=spacing) {
        scene[x] = []
        for (y=0; y<height+1; y+=spacing) {
            scene[x][y] = !!round(noise(x,y))
        }
    }
    paintR = 1
    noCursor()
    //onContextMenu(function() {})
}

function draw() {
    background(150)

    x = round(mouseX/spacing)*spacing
    y = round(mouseY/spacing)*spacing
    noFill()
    stroke(0,255,0)
    strokeWeight(4)
    rect(x-paintR*spacing,y-paintR*spacing, paintR*2*spacing,paintR*2*spacing)
    line(x,y, mouseX,mouseY)
    if (mouseIsPressed) {
        for (xm=-paintR*spacing; xm<paintR*spacing+1; xm+=spacing){
            for (ym=-paintR*spacing; ym<paintR*spacing+1; ym+=spacing) {
                scene[x+xm][y+ym] = mouseButton == LEFT
            }
        }
    }

    noFill()
    strokeWeight(5)
    for (x=0; x<width+1; x+=spacing) {
        for (y=0; y<height+1; y+=spacing) {
            if (scene[x][y]) {
                stroke(255,75,75)
            } else {
                stroke(200)
            }
            point(x,y)
        }
    }

    noStroke()
    //strokeWeight(1)
    //stroke(255,75,75)
    fill(255,75,75)
    for (x=0; x<width; x+=spacing) {
        for (y=0; y<height; y+=spacing) {
            beginShape()
            if (scene[x        ][y        ]) {vertex(x        ,y        )}
            if (scene[x+spacing][y        ]) {vertex(x+spacing,y        )}
            if (scene[x+spacing][y+spacing]) {vertex(x+spacing,y+spacing)}
            if (scene[x        ][y+spacing]) {vertex(x        ,y+spacing)}
            //a = dec[[
                //scene[x        ][y        ],
                //scene[x+spacing][y        ],
                //scene[x+spacing][y+spacing],
                //scene[x        ][y+spacing],
            //]]
            //s = spacing/2
            //if (a[0]) {vertex(x+s,y)}
            //if (a[1]) {vertex(x+spacing,y+s)}
            //if (a[2]) {vertex(x+s,y+spacing)}
            //if (a[3]) {vertex(x,y+s)}
            endShape(CLOSE)
        }
    }
}

function mouseWheel(event) {
    paintR -= event.delta/100
    if (paintR < 0) {paintR = 0}
    return false //Disables page scrolling
}
