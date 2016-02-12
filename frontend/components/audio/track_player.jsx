var React = require('react');
var TrackWaveform = require('./track_waveform');
var LikeButton = require('../buttons/like_button');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');
var PlaybackFunctions = require('../../mixins/playback_functions');
var TrackStats = require('./track_stats');
var ApiUtil = require('../../util/api_util');
var AddToPlaylist = require('../buttons/add_to_playlist');
var CommentLayer = require('../comments/comment_layer_track_player');
var CommentInputBoxSmall = require('../comments/comment_input_box_small');

var TrackPlayer = React.createClass({
  mixins: [PlaybackFunctions],

  getInitialState: function () {
    return { WSObject: null, ready: false };
  },

  componentDidMount: function () {
    this.setState({});
    var playerKey = this.props.song.id;
    var storeToken;
    var WSObject;

    if (CurrentPlayingSongStore.hasSong(playerKey)) {
      storeToken = CurrentPlayingSongStore.addListener(this.setPlayStatus);
      WSObject = CurrentPlayingSongStore.getSong(playerKey);
      CurrentPlayingSongStore.remount(playerKey, 65);
      this.setState({ storeToken: storeToken, WSObject: WSObject, ready: true });
    } else {
      var wavesurfer = WaveSurfer.create({
        container: '.wave' + playerKey,
        waveColor: '#999',
        progressColor: '#0BF',
        barWidth: 2,
        cursorWidth: 0,
        height: 65,
        width: 645,
        fillParent: true
      });

      wavesurfer.on('ready', function () {
        this.setState({ ready: true });
      }.bind(this));

      var ajax = wavesurfer.load(this.props.song.audio_url);

      WSObject = { id: this.props.song.id, wavesurfer: wavesurfer, song: this.props.song, ajax: ajax };

      var timeoutId = setTimeout(function () {
        PlayingSongActions.receiveWavesurfer(WSObject);
      }, 0);

      storeToken = CurrentPlayingSongStore.addListener(this.setPlayStatus);

      this.setState({ WSObject: WSObject, storeToken: storeToken, timeoutId: timeoutId });
    }
  },

  componentWillUnmount: function () {
    this.state.storeToken.remove();
    if (!this.state.ready) {
      this.state.WSObject.ajax.xhr.abort();
      this.state.WSObject.wavesurfer.Observer.unAll();
      this.state.WSObject.wavesurfer.empty();
      this.state.WSObject.wavesurfer.destroy();
      CurrentPlayingSongStore.destroySong(this.props.song.id);
      clearTimeout(this.state.timeoutId);
    } else {
      var playerKey = this.props.song.id;
      var WSObject = CurrentPlayingSongStore.getSong(playerKey);
      if (WSObject.wavesurfer.container.children.length === 0) {
        var selector = '.wave' + playerKey;
        $(WSObject.wavesurfer.container).append($(selector).children()[0]);
      }
    }
  },

  pP: function (e) {
    e.preventDefault();
    var cT = CurrentPlayingSongStore.getCurrentTime(this.state.WSObject.id);
    if (cT === 0) {
      ApiUtil.addPlay(this.state.WSObject.id);
    }
    this.playPause(this.state.WSObject.id);
  },

  extendPlayer: function () {
    this.setState({ extended: true });
  },

  render: function () {
    var userURL = '#/users/' + this.props.song.user_id;
    var songURL = '#/songs/' + this.props.song.id;
    var playButton;

    if (!this.state.WSObject || !this.state.ready) {
      playButton = <div className="loader-play-button-small">Loading...</div>;
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
    var playerKeyWav = 'track-waveform wave' + this.props.song.id;

    // var hidden;
    // var position;
    // if (this.props.hidden) {
    //   position = 'absolute';
    //   hidden = 'hidden';
    // } else {
    //   position = 'relative';
    //   hidden = 'visible';
    // }
    // var hideStyle = { visibility: hidden, position: position };
    var heightStyle;
    if (this.state.extended) {
      heightStyle = { height: 220, transition: 'height 1s ease' };
    }

    return (
      <div className="track-player" style={heightStyle}>
        <div className="thumb">
          <div className="image-centerer">
            <img src={this.props.song.image_url}/>
          </div>
        </div>
        <div className="play-button">{playButton}</div>
        <div className="track-artist-name-div"><h1 className="track-artist-name"><a href={userURL}>{this.props.song.username}</a></h1></div>
        <h2 className="track-title"><a href={songURL}>{this.props.song.title}</a></h2>
        <div className={playerKeyWav}>

        </div>
        <CommentLayer songLength={CurrentPlayingSongStore.getDuration(this.props.song.id)}
            comments={this.props.song.comments} extendPlayer={this.extendPlayer}/>
          <CommentInputBoxSmall extended={this.state.extended} song={this.props.song} />
        <div className="track-player-info-buttons group">
          <LikeButton song={this.props.song} />
          <AddToPlaylist song={this.props.song} />
          <div className="track-stats-reg">
            <TrackStats song={this.props.song} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TrackPlayer;
