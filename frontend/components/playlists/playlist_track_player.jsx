var React = require('react');
var TrackWaveform = require('../audio/track_waveform');
var LikeButton = require('../buttons/like_button');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');
var PlaybackFunctions = require('../../mixins/playback_functions');
var TrackStats = require('../audio/track_stats');
var ApiUtil = require('../../util/api_util');
var PlaylistItem = require('./playlist_item');
var TrackPlayer = require('../audio/track_player');

var PlaylistTrackPlayer = React.createClass({
  mixins: [PlaybackFunctions],

  getInitialState: function () {
    return { WSObject: null, currentPlaying: null, currentSong: this.props.playlist.songs[0]};
  },

  componentDidMount: function () {
    // this.setState({});
    // var WSPlaylist = [];
    // var playerKey;
    // var wavesurfer;
    // var WSObject;
    //
    // //CREATE PLAYLIST ARRAY OF WSOBJECTS
    // this.props.playlist.songs.forEach(function (song) {
    //   playerKey = song.id;
    //   wavesurfer = WaveSurfer.create({
    //     container: '.wave' + playerKey,
    //     waveColor: 'silver',
    //     progressColor: '#0BF',
    //     barWidth: 2,
    //     cursorWidth: 0,
    //     height: 65,
    //     width: 645,
    //     fillParent: true
    //   });
    //
    //   wavesurfer.on('ready', function () {
    //   }.bind(this));
    //
    //   wavesurfer.load(song.audio_url);
    //
    //   WSObject = { id: song.id, wavesurfer: wavesurfer };
    //
    //   WSPlaylist.push(WSObject);
    // }.bind(this));


    // this.setState({ WSPlaylist: WSPlaylist , currentPlaying: WSPlaylist[0], currentSong: this.props.playlist.songs[0] });

    // setTimeout(function () {
    //   PlayingSongActions.receivePlaylist(WSPlaylist);
    // }, 0);
    //
    // var storeToken = CurrentPlayingSongStore.addListener(this.setPlaylistPlayStatus);
    // this.setState({ storeToken: storeToken });
  },

  // componentWillUnmount: function () {
  //   this.state.storeToken.remove();
  // },

  loadSong: function () {

  },

  setPlaylistPlayStatus: function () {
    var currentPlayingId = CurrentPlayingSongStore.getCurrentPlayingId();
    var idx;
    this.props.playlist.songs.forEach(function (song, i) {
      if (song.id == currentPlayingId) {
        idx = i;
      }
    });
    if (idx) {
      this.setState({ currentSong: this.props.playlist.songs[idx] });
    }
  },

  pP: function () {
    var cT = CurrentPlayingSongStore.getCurrentTime(this.state.currentSong.id);
    if (cT === 0) {
      ApiUtil.addPlay(this.state.currentSong.id);
    }
    this.playPause(this.state.currentSong.id);
  },

  render: function () {

    var userURL = '#/users/' + this.props.playlist.user_id;
    var songURL = '#/songs/' + this.state.currentSong.id;
    var playButton;

    if (!this.state.currentSong) {
      playButton = <div className="loader">Loading...</div>;
    } else {
      if (this.isPlaying(this.state.currentSong.id)) {
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
    var playerKeyWav = 'wave' + this.state.currentSong.id;

    var playlistItems = [];
    var playlistItem;
    var hidden;
    var trackPlayer;

    this.props.playlist.songs.forEach(function (song) {
      var displayStyle;
      if (this.state.currentSong.id == song.id) {
        trackPlayer = <TrackPlayer key={song.id} song={song} />;
      }
      playlistItems.push(<PlaylistItem key={song.id} song={song} />);
    }.bind(this));
    return (
      <div className="playlist-track-player">
        {trackPlayer}
        <div className="playlist-items">
          {playlistItems}
        </div>
      </div>
    );
  }
});

module.exports = PlaylistTrackPlayer;
