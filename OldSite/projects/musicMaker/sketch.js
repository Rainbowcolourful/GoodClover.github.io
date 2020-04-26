function setup() {
    createCanvas(1200,600)
    noCursor()
    bpm = 120
    playing = false
    c = 0
    nList = ["A3","B3","C4","D4","E4","F4","G4","A4","B4","C5","D5","E5","F5","G5"]
    notes = []
    m = 6
    for (i=0; i<=13; i++) {
        m += random([-2, -1,-1, 0,0,0, 1,1, 2])
        if (m >= nList.length) {
            m = nList.length-1
        } else if (m < 0) {
            m = 0
        }
        notes.push(nList[m])
    }
    noteW = width/notes.length
    noteH = height/nList.length
    synth = new Tone.Synth({oscillator: {type: "sine"}, envelope: {attack: 0.025, decay: 0.1, sustain: 0.3, release: 1}}).toMaster()
}

function draw() {
    frameRate( bpm/60 )
    background(150)
    if (playing) {
        c++
        if (c >= notes.length) {c = 0}
        if (notes[c-1] != notes[c]) { //Not the same as prev note
            synth.triggerRelease()
            synth.triggerAttack(notes[c], "8n")
        }
    }

    noStroke()
    for (i=0; i<notes.length; i++) {
        m = nList.indexOf(notes[i])
        r = map(m, 0,nList.length, 0,255)
        fill(r,0,0)
        rect( map(i, 0,notes.length, 0,width),height-noteH-map(m, 0,nList.length, 0,height), noteW,noteH )
    }

    noStroke()
    fill(50,200,0, 50)
    rect(map(c, 0,notes.length, 0,width),0, noteW,height)

    noStroke()
    fill(200,200,200, 75)
    for (i=0; i<nList.length; i++) {
        text(nList[i], map(c, 0,notes.length, 0,width)+noteW/2, height-map(i, 0,nList.length, 0,height)-noteH/2) //Note Cursor
        text(nList[i], noteW/2, height-map(i, 0,nList.length, 0,height)-noteH/2)//Start
    }

    //Mouse
    noStroke()
    fill(200,200,200, 75)
    text(nList[i], mouseX,mouseY)//Start
}

function mousePressed() {
    if (mouseX >= 0 && mouseY >= 0 && mouseX <= width && mouseY <= height) {
        x = Math.floor(mouseX/noteW)
        y = Math.floor((height-mouseY)/noteH)
        if (mouseButton == LEFT) {
            notes[x] = nList[y]
        } else if (mouseButton == RIGHT) {
            notes[x] = undefined
        }
    }
}

function keyPressed() {
    if (keyCode == 32) { //Space
        if (!playing) {
            playing = true
            synth.triggerAttack(notes[c], "8n")
        } else {
            playing = false
            synth.triggerRelease()
        }
    }
}
