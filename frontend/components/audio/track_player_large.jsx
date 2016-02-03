var React = require('react');
var TrackWaveformLarge = require('./track_waveform_large');
var LikeButton = require('../buttons/like_button');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');
var CurrentUserStore = require('../../stores/current_user_store');
var Dispatcher = require('../../dispatcher/dispatcher');
var SongStore = require('../../stores/song_store');
var PlaybackFunctions = require('../../mixins/playback_functions');
var TrackStats = require('./track_stats');
var ApiUtil = require('../../util/api_util');

var TrackPlayerLarge = React.createClass({
  mixins: [PlaybackFunctions],

  getInitialState: function () {
    return { WSObject: null };
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
      // this.setState({});
      this.pP();
    }.bind(this));

    wavesurfer.load(this.props.song.audio_url);

    var WSObject = { id: this.props.song.id, wavesurfer: wavesurfer };

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

    // if (this.state.wavesurfer) {
    //   PlayingSongActions.newSong(this.state.wavesurfer);
    // }
    var userURL = '#/users/' + this.props.song.user_id;
    var songURL = '#/songs/' + this.props.song.id;
    var playButton;

    if (!this.state.WSObject) {
      playButton = <div className="loader">Loading...</div>;
    } else {
      if (this.isPlaying(this.state.WSObject.id)) {
        playButton = <button onClick={this.pP}>
          <div className="play-circle-large">
            <div className="pause-large"/>
            <div className="pause-right-large"/>
          </div>
        </button>;
      } else {
        playButton = <button onClick={this.pP}>
          <div className="play-circle-large">
            <div className="play-triangle-large"/>
          </div>
        </button>;
      }
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
