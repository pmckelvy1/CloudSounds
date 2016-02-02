var React = require('react');
var TrackWaveformLarge = require('./track_waveform_large');
var LikeButton = require('../buttons/like_button');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');
var CurrentUserStore = require('../../stores/current_user_store');
var Dispatcher = require('../../dispatcher/dispatcher');
var SongStore = require('../../stores/song_store');

var TrackPlayerLarge = React.createClass({
  getInitialState: function () {
    return { wavesurfer: null };
  },

  componentDidMount: function () {
    // this.setState({});
    var wavesurfer = WaveSurfer.create({
        container: '.wave',
        waveColor: 'silver',
        progressColor: '#0BF',
        barWidth: 2,
        cursorWidth: 0,
        fillParent: true
    });

    wavesurfer.on('ready', function () {
      // PlayingSongActions.play();
      PlayingSongActions.playPause();
      this.setState({});
    }.bind(this));

    wavesurfer.load(this.props.song.audio_url);

    this.setState({ wavesurfer: wavesurfer });

    setTimeout(function () {
      PlayingSongActions.receiveWavesurfer(wavesurfer);
    }, 0);

  },

  // componentWillUnmount: function () {
  //   this.state.storeToken.remove();
  // },

  playPause: function () {
    // this.state.wavesurfer.playPause();
    PlayingSongActions.playPause();
    this.setState({});
  },

  isPlaying: function () {
    if (this.state.wavesurfer) {
      if (this.state.wavesurfer.isPlaying()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  render: function () {

    // if (this.state.wavesurfer) {
    //   PlayingSongActions.newSong(this.state.wavesurfer);
    // }
    var userURL = '#/users/' + this.props.song.user_id;
    var songURL = '#/songs/' + this.props.song.id;
    var playButton;
    if (this.isPlaying()) {
        playButton = <button onClick={this.playPause}>
          <div className="play-circle-large">
          <div className="pause-large"/>
          <div className="pause-right-large"/>
          </div>
        </button>;
    } else {
      playButton = <button onClick={this.playPause}>
          <div className="play-circle-large">
          <div className="play-triangle-large"/>
          </div>
        </button>;
    }

    return (
      <div className="track-player-large">
        <div className="play-button-large">{playButton}</div>
        <div className="thumb-large"><img src={this.props.song.image_url}/></div>
        <h1 className="track-artist-name-div-large"><a className="track-artist-name-large" href={userURL}>{this.props.song.username}</a></h1>
        <h2 className="track-title-large">{this.props.song.title}</h2>
        <div className="track-waveform-large">
          <div className="wave"/>
        </div>
      </div>
    );
  }

});

module.exports = TrackPlayerLarge;
