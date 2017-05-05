const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage, generateLocationMessage} = require('./utils/message');
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

    // socket.emit('newMessageEvent', {
    //     from: 'admin',
    //     text: 'Welcome to chat app',
    //     createdAt: new Date().getTime()
    // });

    socket.emit('newMessageEvent', generateMessage('Admin', 'Welcome to cat app'));

    socket.broadcast.emit('newMessageEvent', generateMessage('Admin', 'New user has joined'));

    socket.on('createMessageEvent', (message, callback) => {
        // console.log(message);
        io.emit('newMessageEvent', generateMessage(message.from, message.text));
        callback('This is from server');
    })

    socket.on('createLocationEvent', (coords) => {
        io.emit('newLocationEvent', generateLocationMessage('Inthra', coords.latitude, coords.longitude));
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