function positive(n) {
    if (n < 0) {
        n *= -1
    }
    return n
}

class Cell {
    constructor(x,y, n) {
        this.pos = createVector(x,y)
        this.vel = createVector(0,0)
        this.nutri = n //Nutrients
        this.move = 0.1
    }
    do() {
        this.vel.add(random(-this.move,this.move), random(-this.move,this.move))
        this.pos.add(this.vel)
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -0.75
        }
        if (this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -0.75
        }
        for (peice of food) {
            //console.log(peice.dista(this.pos))
            if ( peice.dista(this.pos) < this.nutri ) {
                this.nutri += peice.nutri
                peice.nutri = 0
            }
        }
        this.nutri -= deplete
        if (this.nutri >= splitMin) {
            this.nutri /= 2
            dish.push( new Cell(this.pos.x+random(-20,20), this.pos.y+random(-20,20), this.nutri) )
        } else if (this.nutri <= 0) {
            toSplice.push( dish.indexOf(this) )
        }
    }
    draw() {
        noStroke()
        //fill("#fdf196")
        //circle(this.pos.x, this.pos.y, this.nutri)
        image(cellImage, this.pos.x-this.nutri/2, this.pos.y-this.nutri/2, this.nutri,this.nutri)
    }
}

class Food {
    constructor(x,y, n) {
        this.pos = createVector(x,y)
        this.nutri = n //Nutrients
    }
    dista(pos) {
        return positive( sqrt( (pos.x-this.pos.x)**2 + (pos.y-this.pos.y)**2 ) - this.nutri )
    }
    draw() {
        noStroke()
        //fill("#ffffff")
        //circle(this.pos.x, this.pos.y, this.nutri)
        if (this.nutri > 0) {
            image(foodImage, this.pos.x-this.nutri/2, this.pos.y-this.nutri/2, this.nutri,this.nutri)
        }
    }
}

function setup() {
    angleMode(DEGREES)
    createCanvas(600,600)
    deplete = 0.1
    splitMin = 45
    cellImage = loadImage("./cell.png")
    foodImage = loadImage("./food.png")

    dish = []
    for (i=0; i<10; i++) {
        dish.push( new Cell(random(width), random(height), random(50,100)) )
    }
    food = []
}

function draw() {
    background(150)

    for (i=0; i<1; i++) {
        food.push( new Food(random(width), random(height), random(10,20)) )
    }
    for (peice of food) {
        peice.draw()
    }

    toSplice = []
    for (cell of dish) {
        cell.do()
        cell.draw()
    }
    for (sp of toSplice) {
        dish.splice(sp,1)
    }
}

function mousePressed() {
    dish.push(new Cell(mouseX, mouseY, random(50,100)))
}
