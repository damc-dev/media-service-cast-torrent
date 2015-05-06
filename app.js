var express = require('express');
//var cast = require('castnow');
var app = express();
var Player = require('./player');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/cast/magnet/:link', function (req, res, next) {
  var magnetLink = req.params.link
  var player = new Player(magnetLink);
  res.send(player.getStatus());
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
