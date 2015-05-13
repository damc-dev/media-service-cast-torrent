var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var peercast = require('peercast');

io.on('connection', function(socket){
  console.log('connected');
  socket.on('playback:stream', function(data) {
    var magnetUrl = data.magnetUrl;

    var engine = peercast(magnetUrl);

    console.log(engine);
    engine.on('chromecast-status', function(status) {
      console.log('chromecast status: %s', status.playerState)
      socket.emit('playback:status', {
        status: status.playerState
      });
    });

    engine.on('chromecast-playing', function(file) {
      console.log('chromcast is playing %s', file.name)
      socket.emit('playback:status', {
        status: "playing " + file.name
      });
    });

  });

  socket.on('playback:stop', function(data) {
    console.log('recieved stop request from user');
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

server.listen(3000,function(){
    console.log('Socket.io Running');
});
