const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations');
const publicPath = path.join(__dirname, '/../public');
const {User} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new User();

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

    
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            // any further code should not be executed if the expected information in not available
            return callback('Name and Room name are required');
        }

        // join a chat room
        socket.join(params.room);

        //remove the user if he is already in the room
        users.removeUser(socket.id);
        // add a new user to the chat room
        users.addUser(socket.id, params.name, params.room);

        // send the updated user list to the client by emitting the updateUserList event by calling the getUserList function
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // users.getUserList(params)
        socket.emit('newMessageEvent', generateMessage('Admin', 'Welcome to chat app'));

        // send a message to everyone in the room that a new user has joined
        socket.broadcast.to(params.room).emit('newMessageEvent', generateMessage('Admin', `${params.name} has joined.`));


        callback();
    })

    socket.on('createMessageEvent', (message, callback) => {
        // console.log(message);
        var user = users.getUser(socket.id);
        
        if(user && isRealString(message.text)){
             io.to(user.room).emit('newMessageEvent', generateMessage(user.name, message.text));
        }
       
        callback('This is from server');
    })

    socket.on('createLocationEvent', (coords) => {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationEvent', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    })

    socket.on('disconnect', () => {
        // console.log('Client disconnected');
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessageEvent', generateMessage('Admin', `${user.name} has left.`));
        }
    })

});

app.use(express.static(publicPath));
const port = process.env.PORT || 3000;

server.listen(port, ()=> {
    console.log(`Server started and listening on port ${port}`);
})