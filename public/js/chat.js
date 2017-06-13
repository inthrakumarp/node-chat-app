var socket = io();
                
socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);
     console.log('Connected to server');

    socket.emit('join', params, function(err) {
        if(err){
            alert(err);
            window.location.href = "/";
        } else{
            console.log("No error");
        }
    });
});

function scrollBottom(){
    var messages = jQuery("#messages");
    var scrollTop = messages.prop('scrollTop');
    var clientHeight = messages.prop('clientHeight');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessage = messages.children('li:last-child');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
// console.log(newMessageHeight);
    if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight  >= scrollHeight){
        // console.log('scroll down');
        messages.scrollTop(scrollHeight);
    }
}

socket.on('newMessageEvent', function (newMessage) {
    var formattedTime = moment(newMessage.createdAt).format('H:mm a');
    console.log('New Message', newMessage);
    var template = jQuery("#message-template").html();

    var html = Mustache.render(template, {
        from: newMessage.from,
        text: newMessage.text,
        createdAt: formattedTime
    });

     jQuery('#messages').append(html);
     scrollBottom();
})    

socket.on('newLocationEvent', function (locationMessage) {
    var formattedTime = moment(locationMessage.createdAt).format('H:mm a');

    var template = jQuery("#location-template").html();

    var html = Mustache.render(template, {
        from: locationMessage.from,
        url: locationMessage.url,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);
})

// socket.emit('createMessageEvent', {
//     from: 'Inthra',
//     text: 'ASL pls  '
// }, function (data) {
//     console.log('Got it', data);
// })

socket.on('disconnect', () => {
    console.log('Disconnected from server');
})

socket.on('updateUserList', function (users) {
    // console.log('User list', users);
    var ol = jQuery("<ol></ol>");

    users.forEach(function (user) {
        ol.append(jQuery("<li></li>").text(user));
    });

    jQuery("#users").html(ol);
})
jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageBox = jQuery('[name=message]');
    socket.emit('createMessageEvent', {
        //from: 'Inthra',
        text: messageBox.val()
    }, function(){
        messageBox.val('');
    })
});

var locationElement = jQuery("#send-location");
locationElement.on("click", function (){
    if(!navigator.geolocation){
        alert('Your browser does not  support geolocation');
    }
    locationElement.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position){
        socket.emit('createLocationEvent', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationElement.removeAttr('disabled').text('Send location');   
    }, function (){
        alert("Not able to get the geo location");
        locationElement.removeAttr('disabled').text('Send location');  
    })
})