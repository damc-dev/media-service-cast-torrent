var peercast = require('peercast')

function Player(magnetLink) {
  this.status = "starting.."
  engine = peercast(magnetLink);

  engine.on('chromecast-status', function(status) {
    console.log('chromecast status: %s', status.playerState)
    this.status = 'chromecast status: %s', status.playerState;
  });

  engine.on('chromecast-playing', function(file) {
    console.log('chromcast is playing %s', file.name)
    this.status = 'chromcast is playing %s', file.name;
  });
}

Player.prototype.getStatus = function status() {
  return this.status;
}

module.exports = Player;
