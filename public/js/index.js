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

socket.on('newLocationEvent', function (locationMessage) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${locationMessage.from}`);
    a.attr('href', locationMessage.url);
    li.append(a);

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
});

var locationElement = jQuery("#send-location");
locationElement.on("click", function (){
    if(!navigator.geolocation){
        alert('Your browser does not  support geolocation');
    }

    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationEvent', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (){
        alert("Not able to get the geo location");
    })
})