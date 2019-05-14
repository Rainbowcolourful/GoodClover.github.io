
express = require("express")
app = express()
server = app.listen(3000)
socket = require("socket.io")
io = socket(server)


io.sockets.on("connection", function(socket) {
    console.log("New connection: " + socket.id)
    socket.on("mouse", function(data) {
        socket.broadcast.emit("mouse", data)
    })
})


console.log("Server running")
