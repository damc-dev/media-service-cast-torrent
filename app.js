var express = require('express');
var app = express();
var Player = require('./player');

app.get('/cast/magnet/:link', function (req, res, next) {
  var magnetLink = req.params.link
  var player = new Player(magnetLink);
  res.send(player.getStatus());
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('media-service-cast-torrent listening at http://%s:%s', host, port);
  console.log('Usage: curl http://%s:%s/cast/magnet/{url-encoded magnet link}', host, port);

});
