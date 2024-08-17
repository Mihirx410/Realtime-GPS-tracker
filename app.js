const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const http = require('http');
const socketio = require('socket.io'); // socket will run on http, so you have to define http because we are using express server
const { styleText } = require('util');
const { type } = require('os');
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

io.on('connection', (socket) => {
    console.log('connected');

    socket.on("send-location", (data) => {
        io.emit("recieved-location", { id: socket.id, ...data }); // io.emit will help us to maintain all user data, all users that are connected they can see their location
    });

    // // Adding more logging to check disconnection
    // socket.on("disconnect", () => {
    //     console.log(`User disconnected: ${socket.id}`);
    //     io.emit("user-disconnected", socket.id);
    // });
});

app.get('/', (req, res) => {
    res.render("index");
});

// we have to define server because we are using http server as above defined
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
