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
  //
  // setPlayStatus: function () {
  //   if (this.state.WSObject) {
  //     if (CurrentPlayingSongStore.isPlaying(this.state.WSObject.id)) {
  //       this.state.WSObject.wavesurfer.play();
  //     } else {
  //       if (this.state.WSObject.wavesurfer.isPlaying()) {
  //         this.state.WSObject.wavesurfer.pause();
  //       }
  //     }
  //     // else {
  //     //   this.state.WSObject.wavesurfer.pause();
  //     // }
  //   }
  //   this.setState({});
  // },

};

module.exports = PlaybackFunctions;
