var React = require('react');
var TrackWaveform = require('./track_waveform');
var LikeButton = require('../buttons/like_button');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');
var PlaybackFunctions = require('../../mixins/playback_functions');
var TrackStats = require('./track_stats');
var ApiUtil = require('../../util/api_util');
var AddToPlaylist = require('../buttons/add_to_playlist');

var TrackPlayer = React.createClass({
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
        barWidth: 2,
        cursorWidth: 0,
        height: 65,
        width: 645,
        fillParent: true
    });

    wavesurfer.on('ready', function () {
        // this.setState({});
    }.bind(this));

    wavesurfer.load(this.props.song.audio_url);

    var WSObject = { id: this.props.song.id, wavesurfer: wavesurfer };

    this.setState({ WSObject: WSObject });

    setTimeout(function () {
      PlayingSongActions.receiveWavesurfer(WSObject);
    }, 0);

    var storeToken = CurrentPlayingSongStore.addListener(this.setPlayStatus);
    this.setState({ storeToken: storeToken });

    // if (this.props.autoplay) {
    //   this.playPause(this.state.WSObject.id);
    // }
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
      if (this.isPlaying(this.state.WSObject.id)) {
          playButton = <button onClick={this.pP}>
            <div className="play-circle">
            <div className="pause"/>
            <div className="pause-right"/>
            </div>
          </button>;
      } else {
        playButton = <button onClick={this.pP}>
            <div className="play-circle">
            <div className="play-triangle"/>
            </div>
          </button>;
      }
    }
    var playerKeyWav = 'wave' + this.props.song.id;

    var hidden;
    if (this.props.hidden) {
      position = 'absolute';
      hidden = 'hidden';
    } else {
      position = 'relative';
      hidden = 'visible';
    }
    var hideStyle = { visibility: hidden, position: position };

    return (
      <div className="track-player" style={hideStyle}>
        <div className="thumb"><img src={this.props.song.image_url}/></div>
        <div className="play-button">{playButton}</div>
        <div className="track-artist-name-div"><h1 className="track-artist-name"><a href={userURL}>{this.props.song.username}</a></h1></div>
        <h2 className="track-title"><a href={songURL}>{this.props.song.title}</a></h2>
        <div className="track-waveform">
          <div className={playerKeyWav}/>
        </div>
        <LikeButton song={this.props.song} />
        <AddToPlaylist song={this.props.song} />
        <div className="track-stats-reg">
          <TrackStats song={this.props.song} />
        </div>
      </div>
    );
  }

});

module.exports = TrackPlayer;
