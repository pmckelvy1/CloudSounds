var React = require('react');
var TrackWaveform = require('./track_waveform');
var LikeButton = require('../buttons/like_button');

var TrackPlayerMini = React.createClass({
  getInitialState: function () {
    return { wavesurfer: null };
  },

  componentDidMount: function () {
    this.setState({});
    var playerKey = this.props.song.id;
    var wavesurfer = WaveSurfer.create({
        container: '.wave' + playerKey,
        waveColor: 'silver',
        progressColor: '#0BF',
        cursorWidth: 0,
        height: 0,
        fillParent: true
    });

    wavesurfer.on('ready', function () {
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
          <div className="play-circle-mini">
          <div className="pause-mini"/>
          <div className="pause-right-mini"/>
          </div>
        </button>;
    } else {
      playButton = <button onClick={this.playPause}>
          <div className="play-circle-mini">
          <div className="play-triangle-mini"/>
          </div>
        </button>;
    }
    
    var playerKeyWav = 'wave' + this.props.song.id;
    return (
      <div className="track-player-mini">
        <div className="thumb-mini"><img src={this.props.song.image_url}/></div>
        <div className="play-button-mini">{playButton}</div>
        <h1 className="artist-name-mini"><a href={userURL}>{this.props.song.username}</a></h1>
        <h2><a href={songURL}>{this.props.song.title}</a></h2>
        <div className="track-waveform-mini">
          <div className={playerKeyWav}/>
        </div>
      </div>
    );
  }

});

module.exports = TrackPlayerMini;
