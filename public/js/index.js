var socket = io();
                
socket.on('connect', () => {
    console.log('Connected to server');
})

socket.on('newMessageEvent', function (newMessage) {
    console.log('New Message', newMessage);
})    

// socket.emit('createMessageEvent', {
//     from: 'Inthra',
//     text: 'ASL pls  '
// })

socket.on('disconnect', () => {
    console.log('Disconnected from server');
})