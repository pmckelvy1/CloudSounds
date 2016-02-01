var React = require('react');
var TrackWaveformLarge = require('./track_waveform_large');
var LikeButton = require('../buttons/like_button');

var TrackPlayerLarge = React.createClass({
  getInitialState: function () {
    return { wavesurfer: null };
  },

  componentDidMount: function () {
    this.setState({});
    var wavesurfer = WaveSurfer.create({
        container: '.wave',
        waveColor: 'violet',
        progressColor: 'purple'
    });

    wavesurfer.on('ready', function () {
        wavesurfer.play();
        this.setState({});
    }.bind(this));

    wavesurfer.load(this.props.song.audio_url);

    this.setState({ wavesurfer: wavesurfer });
  },

  playPause: function () {
    this.state.wavesurfer.playPause();
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
