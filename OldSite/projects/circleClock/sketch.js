function setup() {
    createCanvas(600,600)
    midX = width/2
    midY = height/2
    msError = 0
    sPrev = 0
    firstRun = true
}

function draw() {
    background(150)

    h  = map(  hour(),       0,  24,  0,height)
    m  = map(minute(),       0,  60,  0,h)
    s  = map(second(),       0,  60,  0,m)
    ms = map( (millis()+msError) %1000,  0,1000,  0,s)

    if (s != sPrev && !firstRun) {
        msError = 100-(ms%1000)
    }
    sPrev = s

    noStroke()

    fill(160,160,160)
    circle(midX,midY, height,height)

    fill(255,0,0)
    circle(midX,midY, h,h)

    fill(0,200,0)
    circle(midX,midY, m,m)

    fill(0,0,255)
    circle(midX,midY, s,s)

    fill(175,50,100)
    circle(midX,midY, ms,ms)

    fill(255)
    textSize(20)
    text( "Hrs",     midX-h/2, midY-60)
    text("Mins",  midX-m/2, midY-40)
    text("Secs",  midX-s/2, midY-20)
    text(  "Ms", midX-ms/2, midY)

    firstRun = false
}
