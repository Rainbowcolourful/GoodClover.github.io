function setup() {
    createCanvas(600,600) //600x600

    createP()
    button = createButton("Start/Stop")
    button.mousePressed(function() {overTime = !overTime})
    overTime = false

    createP("Zoom:")
    segSlider = createSlider(3,12, 6)
    segSlider.size(600)
    seg = 6

    createP("Water level:")
    waterSlider = createSlider(0,255, 100)
    waterSlider.size(600)
    waterLevel = 100

    createP("Snow level:")
    snowSlider = createSlider(0,255, 190)
    snowSlider.size(600)
    snowLevel = 100

    noiseM = 0.07
    tStep = 0.015
    t = 0
}

function draw() {
    background(150)

    seg = segSlider.value()
    if (waterSlider.value() > 255-70) {
        waterSlider.value(255-70)
    }
    waterLevel = waterSlider.value()
    snowLevel = snowSlider.value()
    if (overTime) {
        t += tStep
    }

    noStroke()
    for (x=0; x<width/seg; x+=1) {
        for (y=0; y<height/seg; y+=1) {
            n = noise( x*noiseM, y*noiseM, t)*255
            if (n < waterLevel) {
                fill(0,0,n+70)
            } else if (n < snowLevel) {
                fill(0,n,0)
            } else {
                fill(n,n,n)
            }
            square(x*seg,y*seg,seg)
        }
    }

}
