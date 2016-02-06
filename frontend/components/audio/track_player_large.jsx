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
      CurrentPlayingSongStore.remount(playerKey, 128);
      this.setState({ storeToken: storeToken, WSObject: WSObject });
      // var selector = '.wave' + playerKey;
      //
      // var $container = $(WSObject.wavesurfer.container);
      // var $children = $($container.children()[0]);
      // var $grand = $($children.children());
      // debugger
      // if ($($grand[0]).attr('width') != '815') {
      //   $($grand[0]).attr('width', '815');
      //   $($grand[0]).attr('height', '128');
      //   $($grand[0]).css('width', '815px');
      //   $($grand[0]).css('height', '128px');
      //   var $greatgrand = $($($grand[1]).children()[0]);
      //   $($($($grand[1]).children()[0])).attr('width', '815');
      //   $($($($grand[1]).children()[0])).attr('height', '128');
      //   $($($($grand[1]).children()[0])).css('width', '815px');
      //   $($($($grand[1]).children()[0])).css('height', '128px');
      // }
      // if (WSObject.wavesurfer.Drawer.getWidth() < 825) {
      //   debugger
      //   WSObject.wavesurfer.Drawer.setWidth(825);
      //   WSObject.wavesurfer.Drawer.setHeight(128);
      // }
      // var container = $(selector)[0];
      // var wavesurfer = WSObject.wavesurfer;
      // var child = wavesurfer.container.children[0];
      //
      // container.appendChild(child);
      //
      // wavesurfer.container = container;
      // wavesurfer.mediaContainer = container;
      // wavesurfer.drawer.container = container;
      // wavesurfer.drawBuffer();
      // $(selector)[0].appendChild(WSObject.wavesurfer.container.children[0]);

    } else {
      var wavesurfer = WaveSurfer.create({
          container: '.wave'+ playerKey,
          waveColor: 'silver',
          progressColor: '#0BF',
          barWidth: 2,
          cursorWidth: 0,
          fillParent: true,
          pixelRatio: 1
      });

      wavesurfer.on('ready', function () {
        this.setState({ ready: true });
        this.pP();
      }.bind(this));

      wavesurfer.load(this.props.song.audio_url);

      WSObject = { id: this.props.song.id, wavesurfer: wavesurfer, song: this.props.song };

      this.setState({ WSObject: WSObject });

      setTimeout(function () {
        PlayingSongActions.receiveWavesurfer(WSObject);
      }, 0);

      storeToken = CurrentPlayingSongStore.addListener(this.setPlayStatus);
      this.setState({ storeToken: storeToken });

    }
  },

  componentWillUnmount: function () {
    this.state.storeToken.remove();
    var playerKey = this.props.song.id;
    var WSObject = CurrentPlayingSongStore.getSong(playerKey);
    if (WSObject.wavesurfer.container.children.length === 0) {
      var selector = '.wave' + playerKey;
      $(WSObject.wavesurfer.container).append($(selector).children()[0]);
    }
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

    if (!this.state.WSObject || !this.state.ready) {
      playButton = <div className="loader-play-button-large">Loading...</div>;
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
    var playerKeyWav = 'track-waveform-large wave' + this.props.song.id;

    return (
      <div className="track-player-large">
        <div className="play-button-large">{playButton}</div>
        <div className="thumb-large"><img src={this.props.song.image_url}/></div>
        <h1 className="track-artist-name-div-large"><a className="track-artist-name-large" href={userURL}>{this.props.song.username}</a></h1>
        <h2 className="track-title-large">{this.props.song.title}</h2>
        <div className={playerKeyWav}>

        </div>
      </div>
    );
  }
});

module.exports = TrackPlayerLarge;
