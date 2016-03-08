// Tout d'abbord on initialise notre application avec le framework Express
// et la bibliothèque http integrée à node.
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// On gère les requêtes HTTP des utilisateurs en leur renvoyant les fichiers du dossier 'public'
app.use("/", express.static(__dirname + "/public"));


//Evenements de connection
io.on('connection', function(socket){
  //Evenements de connection
  var user;
  console.log('user logged in');
  socket.on('disconnect', function(){
    if(user !== undefined){
        console.log('user disconnected : '+user.username);
        var serviceMessage = {
          text : 'User "'+user.username+'" disconnected',
          type : 'logout'
        };
        socket.broadcast.emit('service-message', serviceMessage);
    }
  });


  socket.on('user-login', function(loggedUser){
    console.log('user logged in : '+loggedUser.username);
    user=loggedUser;
    if(user !== undefined){
      var serviceMessage = {
        text : 'User "'+user.username+'" logged in',
        type : 'login'
      };
      socket.broadcast.emit('service-message', serviceMessage);
    }
  });


  //Message Evenements
  socket.on('chat-message', function(message){
    message.username = user.username;
    console.log('Message de : '+ message.username);
    io.emit('chat-message', message);
  });
});


// On lance le serveur en écoutant les connexions arrivant sur le port 3000
http.listen(3000, function(){
  console.log('Server is listening on *:3000');
});
