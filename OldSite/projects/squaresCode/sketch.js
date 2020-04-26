
class Square {
    constructor() {}
    exec(c) {}
    draw(x,y) {
        image(squareImage, x,y, squareSize,squareSize)
    }
}

class Arrow {
    constructor(dir="right") {
        this.dir = dir
    }
    exec(c) {
        c.dir = this.dir
    }
    draw(x,y) {
        push()
        translate(x,y)
        if (this.dir == "left") {
            translate(squareSize,squareSize)
            rotate(180)
        } else if (this.dir == "up") {
            translate(0,squareSize)
            rotate(-90)
        } else if (this.dir == "down") {
            translate(squareSize,0)
            rotate(90)
        }
        image(rightImage, 0,0, squareSize,squareSize)
        pop()
    }
}

class Num {
    constructor(n=0) {
        this.n = n
    }
    exec(c) {
        c.counter = this.n
    }
    draw(x,y) {
        image(squareImage, x,y, squareSize,squareSize)
        push()
        noStroke()
        fill(thatColour.r, thatColour.g, thatColour.b)
        text(this.n, x+squareSize/2,y+squareSize/2)
        pop()
    }
}

class Add {
    constructor() {}
    exec(c) {
        c.counter += 1
    }
    draw(x,y) {
        image(addImage, x,y, squareSize,squareSize)
    }
}

class Sub {
    constructor() {}
    exec(c) {
        c.counter -= 1
    }
    draw(x,y) {
        image(subImage, x,y, squareSize,squareSize)
    }
}

class Split {
    constructor() {}
    exec(c) {
        c.dir = "up"
        var b
        b = {
            counter: c.counter,
            dir: "down",
            cX: c.cX,
            cY: c.cY,
        }
        cursors.push(b)
        //console.log(cursors)
    }
    draw(x,y) {
        image(splitImage, x,y, squareSize,squareSize)
    }
}

class Del {
    constructor() {}
    exec(c) {
        var i
        i = cursors.indexOf(c)
        cursors.splice(i,i+1)
    }
    draw(x,y) {
        image(delImage, x,y, squareSize,squareSize)
    }
}

function setup() {
    createCanvas(800,800)
    angleMode(DEGREES)
    textAlign(CENTER,CENTER)
    textSize(22)
    squareImage = loadImage("./images/default.png")
    cursorImage = loadImage("./images/cursor.png")
    rightImage = loadImage("./images/right.png")
    addImage = loadImage("./images/add.png")
    subImage = loadImage("./images/sub.png")
    splitImage = loadImage("./images/split.png")
    delImage = loadImage("./images/del.png")

    thatColour = {r:119, g:112, b:225}

    speed = 1
    sCount = 0
    createP("Speed:")
    speedSlider = createSlider(1,10, 5).size(800)

    cursors = [{
        counter: 0,
        dir: "right",
        cX: 0,
        cY: 0,
    }]

    squareSize = 32
    gridW = width/squareSize
    gridH = height/squareSize
    grid = []
    for (x=0; x<gridW; x++) {
        grid.push([])
        for (y=0; y<gridH; y++) {
            grid[x].push( new Square() )
        }
    }
    grid[10][0] = new Arrow("down")
    grid[10][10] = new Arrow("right")
    grid[20][10] = new Del()
    grid[10][11] = new Arrow("left")
    grid[5][10] = new Arrow("up")
    grid[5][11] = new Split()
    grid[5][0] = new Arrow("right")
    grid[10][3] = new Add()
    grid[10][7] = new Num(10)
    grid[5][5] = new Sub()
    grid[5][13] = new Arrow("right")
    grid[10][13] = new Arrow("up")
    grid[1][0] = new Arrow("down")
    grid[1][13] = new Arrow("right")
}

function draw() {
    //Speed controlls
    speed = speedSlider.value()
    sCount -= 1
    if (sCount > 0) {
        return
    } sCount = speed

    //Movement of cursors
    for (c of cursors) {
        if (c.dir == "right") {
            c.cX += 1
        } else if (c.dir == "left") {
            c.cX -= 1
        } else if (c.dir == "up") {
            c.cY -= 1
        } else if (c.dir == "down") {
            c.cY += 1
        }
        grid[c.cX][c.cY].exec(c)
    }

    background(150)

    //Draw squares
    for (x=0; x<gridW; x++) {
        for (y=0; y<gridH; y++) {
            grid[x][y].draw(x*squareSize, y*squareSize)
        }
    }

    //Draw Cursors
    noStroke()
    fill(thatColour.r, thatColour.g, thatColour.b)
    for (c of cursors) {
        image(cursorImage, c.cX*squareSize,c.cY*squareSize, squareSize,squareSize)
        //Counter
        text(c.counter, (c.cX+0.5)*squareSize,(c.cY+0.5)*squareSize)
    }
}
