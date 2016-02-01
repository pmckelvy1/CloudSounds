var React = require('react');
var TrackWaveform = require('./track_waveform');
var LikeButton = require('../buttons/like_button');

var TrackPlayer = React.createClass({
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
        barWidth: 2,
        cursorWidth: 0,
        height: 65,
        width: 645
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
          <div className="play-circle">
          <div className="pause"/>
          <div className="pause-right"/>
          </div>
        </button>;
    } else {
      playButton = <button onClick={this.playPause}>
          <div className="play-circle">
          <div className="play-triangle"/>
          </div>
        </button>;
    }

    var playerKeyWav = 'wave' + this.props.song.id;
    return (
      <div className="track-player">
        <div className="thumb"><img src={this.props.song.image_url}/></div>
        <div className="play-button">{playButton}</div>
        <div className="track-artist-name-div"><h1 className="track-artist-name"><a href={userURL}>{this.props.song.username}</a></h1></div>
        <h2 className="track-title"><a href={songURL}>{this.props.song.title}</a></h2>
        <div className="track-waveform">
          <div className={playerKeyWav}/>
        </div>
        <LikeButton song={this.props.song}/>
      </div>
    );
  }

});

module.exports = TrackPlayer;
