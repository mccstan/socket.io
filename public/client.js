var socket = io();

$('form').submit(function(e){
  e.preventDefault(); //preventDefault submit action

  //message JSON object
  var message = {
    text : $('#m').val()
  }

  //socket.emit('chat-message', message); // emission devent de message
  $('#m').val(''); // on vide le conteneur du message
  if(message.text.trim().length !== 0){
    socket.emit('chat-message', message);
  }

  $('#chat input').focus(); // focus sur le chams du message

});

//envoie de message
socket.on('chat-message', function(message){
  $('#messages').append($('<li>').html('<span class="username">' + message.username+'</span>' + message.text));
});


//Connection user
$('#login form').submit(function(e){
  e.preventDefault();
  var user={
    username : $('#login input').val().trim()
  };
  if (user.username.length > 0) {
    socket.emit('user-login', user);
    $('body').removeAttr('id');
    $('#chat input').focus();
  }

});


//Reception de message de serviceMessage
socket.on('service-message', function(message){
  $('#messages').append($('<li class="' + message.type + '">').html('<span class="info">information</span>'+message.text));
});
