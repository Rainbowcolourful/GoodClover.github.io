function setup() {
    createCanvas(600,600)
    theURL = "https://www.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch="
    writeYInc = 30
    backspaceDelayCap = 10
    backspaceDelay = 0
    userInput = ""
    results = []
    select = 0
}

function draw() {
    background(150)

    if (backspaceDelay > 0) {
        backspaceDelay -= 1
    }
    if (keyIsDown(8) && !backspaceDelay > 0) {
        userInput = userInput.slice(0, -1)
        if (userInput.length > 0) {
            wikiGet()
        } else {
            results = []
        }
        backspaceDelay = backspaceDelayCap
    }
    if (keyIsDown(223) && !backspaceDelay > 0) {
        select += 1
        if (select > results.length-1) {
            select = 0
        }
        backspaceDelay = backspaceDelayCap
    }
    if (keyIsDown(13) && !backspaceDelay > 0) {
        userInput = results[select]
        select = 0
        if (typeof userInput == "undefined") {
            userInput = ""
        } else {
            wikiGet()
        }
        backspaceDelay = backspaceDelayCap
    }

    fill(100)
    noStroke()
    textSize(30)
    textAlign(LEFT)
    text(userInput, 10,30)

    writeY = 30
    for (i in results) {
        writeY += writeYInc
        if (i == select) {
            fill(135)
            text(results[i], 15,writeY)
        } else {
            fill(125)
            text(results[i], 10,writeY)
        }
    }

}

function wikiGet() {
    httpGet(theURL+userInput, "jsonp", true, function(data) {
        results = []
        for (i in data.query.search) {
            results.push(data.query.search[i].title)
        }
    })
}

function keyTyped() {
    if (key != "`") {
        userInput += key
        wikiGet()
    }
}
