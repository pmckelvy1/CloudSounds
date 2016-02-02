var CurrentPlayingSongStore = require('../stores/current_playing_song_store');
var PlayingSongActions = require('../actions/playing_song_actions');

var PlaybackFunctions = {

  playPause: function (songId) {
    PlayingSongActions.playPause(songId);
  },

  isPlaying: function (songId) {
    return CurrentPlayingSongStore.isPlaying(songId);
  },

  setPlayStatus: function () {
    this.setState({});
  }

};

module.exports = PlaybackFunctions;
