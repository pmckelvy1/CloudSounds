var React = require('react');
var TrackWaveform = require('./track_waveform');
var LikeButton = require('../buttons/like_button');
var PlaybackFunctions = require('../../mixins/playback_functions');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');
var TrackStats = require('./track_stats');
var ApiUtil = require('../../util/api_util');

var TrackPlayerMini = React.createClass({
  mixins: [PlaybackFunctions],

  getInitialState: function () {
    return { WSObject: null };
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
    }.bind(this));

    wavesurfer.load(this.props.song.audio_url);

    var WSObject = { id: this.props.song.id, wavesurfer: wavesurfer, song: this.props.song };

    this.setState({ WSObject: WSObject });

    setTimeout(function () {
      PlayingSongActions.receiveWavesurfer(WSObject);
    }, 0);

    var storeToken = CurrentPlayingSongStore.addListener(this.setPlayStatus);
    this.setState({ storeToken: storeToken });
  },

  componentWillUnmount: function () {
    this.state.storeToken.remove();
  },

  pP: function () {
    var cT = CurrentPlayingSongStore.getCurrentTime(this.state.WSObject.id);
    if (cT === 0) {
      ApiUtil.addPlay(this.state.WSObject.id);
    }
    this.playPause(this.state.WSObject.id);
  },

  render: function () {
    var userURL = '#/users/' + this.props.song.user_id;
    var songURL = '#/songs/' + this.props.song.id;
    var playButton;

    if (!this.state.WSObject) {
      playButton = <div className="loader">Loading...</div>;
    } else {
      if (this.isPlaying()) {
          playButton = <button onClick={this.pP}>
            <div className="play-circle-mini">
            <div className="pause-mini"/>
            <div className="pause-right-mini"/>
            </div>
          </button>;
      } else {
        playButton = <button onClick={this.pP}>
            <div className="play-circle-mini">
            <div className="play-triangle-mini"/>
            </div>
          </button>;
      }
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
        <div className='track-stats-mini'>
          <TrackStats song={this.props.song} />
        </div>
      </div>
    );
  }

});

module.exports = TrackPlayerMini;
