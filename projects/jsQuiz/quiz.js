quest = [
    {
        q: "What colour is a bannana?",
        as: ["Blue", "Red", "Yellow"],
        a: "Yellow"
    },
    {
        q: "What colour is an apple?",
        as: ["Green", "Red", "All of the above"],
        a: "All of the above"
    },
    {
        q: "What is Notch's real name?",
        as: ["Marley Ponzo", "Markus Pearson", "Just Notch"],
        a: "Markus Pearson"
    },
    {
        q: "What are you?",
        as: ["Human", "Dog", "Cat", "Rabbit", "Bone", "Bannana", "Pie"],
        a: "Human"
    },
    {
        q: "What does JS stand for?",
        as: ["Joe Simon", "Java Script", "Jelly Sandwich"],
        a: "Java Script"
    }
]

quiz = []
maxScore = 0

for (q of quest) {
    //quiz.push( new Question(q.q, q.as, q.a, "q"+file.indexOf(q)) )
    maxScore++
    var temp = document.createElement("P")
    temp.innerHTML = q.q
    document.getElementById("quiz").appendChild(temp)
    var temp = document.createElement("SELECT")
    temp.id = "q"+quest.indexOf(q)
    for (a of q.as) {
        temp.innerHTML += "<option>"+a+"</option>"
    }
    document.getElementById("quiz").appendChild(temp)
}

document.getElementById("quiz").appendChild(document.createElement("BR"))
document.getElementById("quiz").appendChild(document.createElement("BR"))

var temp = document.createElement("INPUT")
temp.type = "button"
temp.onclick = function() {
    var score = 0
    for (q of quest) {
        if ( document.getElementById("q"+quest.indexOf(q)).value == q.a ) {
            score++
        }
    }
    var percent = 100*(score/maxScore)
    var msg = score+"/"+maxScore+" ("+percent+"%)"
    alert(msg)
    var msgP = document.createElement("P")
    msgP.innerHTML = msg
    document.getElementById("quiz").appendChild(msgP)
}
temp.value = "Done!"
document.getElementById("quiz").appendChild(temp)
