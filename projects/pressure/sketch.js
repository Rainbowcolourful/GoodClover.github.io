function setup() {
    createCanvas(600,600)

    gridSize = 20
    gridW = width/gridSize
    gridH = height/gridSize
    grid = []
    for (x=0; x<gridW; x++) {
        grid.push([])
        for (y=0; y<gridH; y++) {
            grid[x].push(0)
        }
    }
}

function draw() {
    if (mouseIsPressed) {
        x = floor(mouseX/gridSize)
        y = floor(mouseY/gridSize)
        if (mouseButton == LEFT) {
            grid[x][y] += 1000
        } else if (mouseButton == RIGHT) {
            grid[x][y] -= 1000
        }
        if (grid[x][y] > 255) {
            grid[x][y] = 255
        }
        if (grid[x][y] < 0) {
            grid[x][y] = 0
        }
    }

    background(150)

    //Draw pressure
    noStroke()
    for (x=0; x<gridW; x++) {
        for (y=0; y<gridH; y++) {
            temp = grid[x][y]/5
            if (x > 0) {
                grid[x-1][y] += temp
                grid[x][y] -= temp
            }
            if (x < gridW-1) {
                grid[x+1][y] += temp
                grid[x][y] -= temp
            }
            if (y > 0) {
                grid[x][y-1] += temp
                grid[x][y] -= temp
            }
            if (y < gridH-1) {
                grid[x][y+1] += temp
                grid[x][y] -= temp
            }
            push()
            colorMode(HSB, 255)
            fill(grid[x][y], 200, grid[x][y])
            rect(x*gridSize,y*gridSize, gridSize,gridSize)
            pop()
        }
    }
}
