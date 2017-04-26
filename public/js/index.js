var socket = io();
                
socket.on('connect', () => {
    console.log('Connected to server');
})

socket.on('newMessageEvent', function (newMessage) {
    console.log('New Message', newMessage);
    var li = jQuery('<li></li>');
    li.text(`${newMessage.from} : ${newMessage.text}`);

    jQuery('#messages').append(li);
})    

socket.emit('createMessageEvent', {
    from: 'Inthra',
    text: 'ASL pls  '
}, function (data) {
    console.log('Got it', data);
})

socket.on('disconnect', () => {
    console.log('Disconnected from server');
})

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessageEvent', {
        from: 'Inthra',
        text: jQuery('[name=message]').val()
    }, function(){})
})