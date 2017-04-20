const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const publicPath = path.join(__dirname, '/../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessageEvent', {
    //     from: 'bannie',
    //     text: 'Hi, how r u?',
    //     createdAt: 123
    // });

    socket.emit('newMessageEvent', {
        from: 'admin',
        text: 'Welcome to chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessageEvent', {
        from: 'admin',
        text: 'New user has joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessageEvent', (message) => {
        console.log(message);
        io.emit('newMessageEvent', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
});

app.use(express.static(publicPath));
const port = process.env.PORT || 3000;

server.listen(port, ()=> {
    console.log(`Server started and listening on port ${port}`);
})