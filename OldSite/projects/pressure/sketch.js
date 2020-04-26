function setup() {
    createCanvas(600,600)

    spread = 40
    createP("Spread:")
    spreadSlider = createSlider(0,45, 10).size(600)
    gridSize = 12
    gridW = width/gridSize
    gridH = height/gridSize
    grid = []
    for (x=0; x<gridW; x++) {
        grid.push([])
        for (y=0; y<gridH; y++) {
            grid[x].push( noise(x/10,y/10)*255 )
        }
    }
}

function draw() {
    spread = 50-spreadSlider.value()

    if (mouseIsPressed) {
        x = floor(mouseX/gridSize)
        y = floor(mouseY/gridSize)
        if (x < 0 || y < 0 || x > gridW-1 || y > gridW-1) {
            console.log("Invalid pos")
        } else {
            if (mouseButton == LEFT) {
                grid[x][y] += 1500
            } else if (mouseButton == RIGHT) {
                grid[x][y] -= 1500
            }
            if (grid[x][y] > 255) {
                grid[x][y] = 255
            }
            if (grid[x][y] < 0) {
                grid[x][y] = 0
            }
        }
    }

    background(150)

    //Draw pressure
    noStroke()
    for (x=0; x<gridW; x++) {
        for (y=0; y<gridH; y++) {
            temp = grid[x][y]/spread
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
            // Sky is (supposedly) 52.9% red, 80.8% green and 92.2% blue
            r = grid[x][y] * 0.529
            g = grid[x][y] * 0.808
            b = grid[x][y] * 0.922
            fill(r,g,b)
            rect(x*gridSize,y*gridSize, gridSize,gridSize)
        }
    }
}
