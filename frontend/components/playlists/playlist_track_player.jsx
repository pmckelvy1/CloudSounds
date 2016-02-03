var React = require('react');
var TrackWaveform = require('./track_waveform');
var LikeButton = require('../buttons/like_button');
var CurrentPlayingSongStore = require('../../stores/current_playing_song_store');
var PlayingSongActions = require('../../actions/playing_song_actions');
var PlaybackFunctions = require('../../mixins/playback_functions');
var TrackStats = require('./track_stats');
var ApiUtil = require('../../util/api_util');
var PlaylistItem = require('./playlist_item');

var PlaylistTrackPlayer = React.createClass({
  mixins: [PlaybackFunctions],

  getInitialState: function () {
    return { WSObject: null };
  },

  componentDidMount: function () {
    this.setState({});
    var WSPlayist = [];
    var playerKey;
    var wavesurfer;
    var WSObject;

    //CREATE PLAYLIST ARRAY OF WSOBJECTS
    this.props.playlist.songs.forEach(function (song) {
      playerKey = song.id;
      wavesurfer = WaveSurfer.create({
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
      }.bind(this));

      wavesurfer.load(song.audio_url);

      WSObject = { id: song.id, wavesurfer: wavesurfer };

      WSPlaylist.push(WSObject);
    }.bind(this));


    this.setState({ WSPlaylist: WSPlaylist , currentPlaying: WSPlaylist[0], currentSong: this.props.playlist.songs[0] });

    setTimeout(function () {
      PlayingSongActions.receivePlaylist(WSPlaylist);
    }, 0);

    var storeToken = CurrentPlayingSongStore.addListener(this.setPlaylistPlayStatus);
    this.setState({ storeToken: storeToken });
  },

  componentWillUnmount: function () {
    this.state.storeToken.remove();
  },

  setPlaylistPlayStatus: function () {
    var currentPlayingId = CurrentPlayingSongStore.getCurrentPlayingId();
    var idx;
    this.state.WSPlaylist.forEach(function (WSObject, i) {
      if (WSObject.id == currentPlayingId) {
        idx = i;
      }
    });
    if (idx) {
      this.setState({ currentPlaying: this.state.WSPlaylist[idx], currentSong: this.props.playlist.songs[idx] });
    }
  },

  pP: function () {
    var cT = CurrentPlayingSongStore.getCurrentTime(this.state.currentPlaying.id);
    if (cT === 0) {
      ApiUtil.addPlay(this.state.currentPlaying.id);
    }
    this.playPause(this.state.currentPlaying.id);
  },

  render: function () {

    var userURL = '#/users/' + this.props.playlist.user_id;
    var songURL = '#/songs/' + this.state.currentPlaying.id;
    var playButton;

    if (!this.state.currentPlaying) {
      playButton = <div className="loader">Loading...</div>;
    } else {
      if (this.isPlaying(this.state.currentPlaying.id)) {
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
    var playerKeyWav = 'wave' + this.state.currentPlaying.id;

    var playlistItems = [];
    var playlistItem;
    this.props.playlist.forEach(function (song) {
      playlistItems.push(<PlaylistItem key={song.id} song={song}/>);
    });
    return (
      <div className="playlist-track-player">
        <div className="thumb"><img src={this.state.currentSong.image_url}/></div>
        <div className="play-button">{playButton}</div>
        <div className="track-artist-name-div"><h1 className="track-artist-name"><a href={userURL}>{this.state.currentSong.username}</a></h1></div>
        <h2 className="track-title"><a href={songURL}>{this.state.currentSong.title}</a></h2>
        <div className="track-waveform">
          <div className={playerKeyWav}/>
        </div>
        <div className="playlist-items">
          {playlistItems}
        </div>
      </div>
    );
  }
});

module.exports = PlaylistTrackPlayer;
