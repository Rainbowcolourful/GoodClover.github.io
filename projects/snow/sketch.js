function Flake(x, y, mass, tin) {
  this.x = x
  this.y = y
  this.xVel = 0
  this.yVel = 0
  this.xAcc = 0
  this.yAcc = 0
  this.mass = mass
  this.tint = tin
  this.update = function() {
    this.xAcc += wind
    this.yAcc += grav

    this.xVel += this.xAcc / this.mass
    this.yVel += this.yAcc / this.mass

    this.xAcc = 0
    this.yAcc = 0

    this.x += this.xVel
    this.y += this.yVel
  }
}


function setup() {
  createCanvas(800, 800)

  flakeImg = loadImage("flake.png")

  wind = 0
  grav = 1

  flakes = []
}


function draw() {
  background(220)

  //wind += random(-0.1,0.1)
  wind = map(mouseX, 0, width, -1, 1)

  stroke(255, 255, 255)
  strokeWeight(10)
  noFill()

  for (i = 0; i < 2; i++) {
    flakes.push(new Flake(random(width), random(-height / 8), random(20, 55), random(0,10)))
  }

  for (var f in flakes) {
    flakes[f].update()
    stroke(255-flakes[f].tint, 255-flakes[f].tint, 255-flakes[f].tint)
    strokeWeight(flakes[f].mass / 2)
    point(flakes[f].x, flakes[f].y)
    //image(flakeImg, flakes[f].x-flakes[f].mass/4, flakes[f].y-flakes[f].mass/4, flakes[f].mass/2, flakes[f].mass/2)

    if (flakes[f].y > height) {
      flakes.splice(f, 1)
    }
  }
}
