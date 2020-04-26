function setup() {
    angleMode(DEGREES)
    createCanvas(600,600)
    zoom = 6
    speed = 1
    sCount = 0
    createP("Speed:")
    speedSlider = createSlider(1,10, 7).size(600)

    registers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] //16 registers
    memory = []
    for (i=0; i<640; i++) { //640 adresses, 0-32 startup, 32-64 reserved, 64-320 screen, 320-640 user
        memory[i] = bin(0)
    }
    progAddr = 0
    counter = 0

}

function bin(n) {
    var d = [0,0,0,0,0,0,0,0]  //Back to front
    if (n>128) {
        n -= 128
        d[7] = 1
    }
    if (n>64) {
        n -= 64
        d[6] = 1
    }
    if (n>32) {
        n -= 32
        d[5] = 1
    }
    if (n>16) {
        n -= 16
        d[4] = 1
    }
    if (n>8) {
        n -= 8
        d[3] = 1
    }
    if (n>4) {
        n -= 4
        d[2] = 1
    }
    if (n>2) {
        n -= 2
        d[1] = 1
    }
    if (n>1) {
        n -= 1
        d[0] = 1
    }
    return d
}

function num(d) {
    var n = 0
    if (d[7]) {
        n += 128
    }
    if (d[6]) {
        n += 64
    }
    if (d[5]) {
        n += 32
    }
    if (d[4]) {
        n += 16
    }
    if (d[3]) {
        n += 8
    }
    if (d[2]) {
        n += 4
    }
    if (d[1]) {
        n += 2
    }
    if (d[0]) {
        n += 1
    }
    return n
}

function num4(d) {
    var n = 0
    if (d[3]) {
        n += 8
    }
    if (d[2]) {
        n += 4
    }
    if (d[1]) {
        n += 2
    }
    if (d[0]) {
        n += 1
    }
    return n
}

function exec(cmd) {
    c = cmd.slice(4,8)
    r = cmd.slice(0,4)
    if (c == [0,0,0,1]) {
        counter += num4(r)
    }
}

function draw() {
    //Speed controlls
    speed = speedSlider.value()
    sCount -= 1
    if (sCount > 0 || speed == 10) {
        return
    } sCount = speed

    //Stuff
    exec(memory[progAddr])
    progAddr ++
    if (progAddr > memory.length-1) {
        progAddr = 0
    }

    //Visuals
    background(150)

    //Screen 16x16
    push()
    translate(16,64)
    for (i=64; i<320; i++) {
        noStroke()
        fill( num(memory[i]) )
        rect(i%16*zoom,floor(i/16)*zoom, zoom,zoom)
    }
    pop()

    //Memory 16x?
    push()
    translate(128,16)
    for (i=0; i<640; i++) {
        stroke(50)
        strokeWeight(1)
        fill( num(memory[i]) )
        rect(i%16*zoom,floor(i/16)*zoom, zoom,zoom)
    }
    pop()
    //Memory bars
    //640 adresses, 0-32 startup, 32-64 reserved, 64-320 screen, 320-640 user
    push()
    noFill()
    stroke(50,255,50)
    strokeWeight(2)
    translate(128,16)
    line(0,0, 0,zoom) //start
    line(32%16*zoom,floor(32/16)*zoom, 32%16*zoom,floor(32/16)*zoom+zoom) //startup end
    line(64%16*zoom,floor(64/16)*zoom, 64%16*zoom,floor(64/16)*zoom+zoom) //reserved end
    line(320%16*zoom,floor(320/16)*zoom, 320%16*zoom,floor(320/16)*zoom+zoom) //screen end
    line(640%16*zoom,floor(640/16)*zoom, 640%16*zoom,floor(640/16)*zoom+zoom) //end
    pop()


    //Counter
    text("Counter: "+counter, 16,16)
    //Prog Addr
    text("Prog Addr: "+progAddr, 16,32)
    //Prog Addr box
    push()
    noFill()
    stroke(50,255,50)
    strokeWeight(2)
    translate(128,16)
    rect(progAddr%16*zoom,floor(progAddr/16)*zoom, zoom,zoom)
    pop()

    //Registers 16x1
    push()
    translate(16,48)
    for (i=0; i<16; i++) {
        stroke(50)
        strokeWeight(1)
        fill( num(registers[i]) )
        rect(i*zoom,0, zoom,zoom)
    }
    pop()
}
