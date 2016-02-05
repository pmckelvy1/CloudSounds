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
    var currentPlaylistItem;
    var currentId = CurrentPlayingSongStore.getCurrentPlayingId();
    var idx;
    this.props.playlist.playlist_items.forEach(function (playlistItem, i) {
      if (playlistItem.song.id == currentId) {
        idx = i;
        currentPlaylistItem = playlistItem;
      }
    });
    if (idx) {
      return {WSObject: null, currentPlaying: null, currentPlaylistItem: currentPlaylistItem };
    } else {
      return { WSObject: null, currentPlaying: null, currentPlaylistItem: this.props.playlist.playlist_items[0]};
    }
  },

  componentDidMount: function () {

  },

  // componentWillUnmount: function () {
  //   this.state.storeToken.remove();
  // },

  loadSong: function () {

  },

  setPlaylistPlayStatus: function () {
    var currentPlayingId = CurrentPlayingSongStore.getCurrentPlayingId();
    var idx;
    this.props.playlist.playlist_items.forEach(function (playlistItem, i) {
      if (playlistItem.song.id == currentPlayingId) {
        idx = i;
      }
    });
    if (idx) {
      this.setState({ currentPlaylistItem: this.props.playlist.playlist_items[idx] });
    }
  },

  pP: function () {
    var cT = CurrentPlayingSongStore.getCurrentTime(this.state.currentPlaylistItem.song.id);
    if (cT === 0) {
      ApiUtil.addPlay(this.state.currentPlaylistItem.song.id);
    }
    this.playPause(this.state.currentPlaylistItem.song.id);
  },

  playSong: function (e) {
    if (this.isPlaying(this.state.currentPlaylistItem.song.id)) {
      this.playPause(this.state.currentPlaylistItem.song.id);
    }
    var playlistItemId = e.currentTarget.dataset.id;
    var idx;
    this.props.playlist.playlist_items.forEach(function (playlistItem, i) {
      if (playlistItem.id == playlistItemId) {
        idx = i;
      }
    }.bind(this));
    this.setState({ currentPlaylistItem: this.props.playlist.playlist_items[idx], autoplay: true });
    // this.playPause(songId);
  },

  deleteFromPlaylist: function (e) {
    e.preventDefault();
    var playlistItemId = e.currentTarget.dataset.id;
    ApiUtil.deletePlaylistItem(playlistItemId);
  },

  render: function () {

    var userURL = '#/users/' + this.props.playlist.user_id;
    var songURL = '#/songs/' + this.state.currentPlaylistItem.song.id;

    var playerKeyWav = 'wave' + this.state.currentPlaylistItem.song.id;

    var playlistItems = [];
    var hidden;
    var trackPlayer;

    this.props.playlist.playlist_items.forEach(function (playlistItem) {
      var displayStyle;
      if (this.state.currentPlaylistItem.id == playlistItem.id) {
        trackPlayer = <TrackPlayer key={playlistItem.song.id}
          song={playlistItem.song}
          autoplay={this.state.autoplay}/>;
      }
        playlistItems.push(<PlaylistItem key={playlistItem.id}
          deleteFromPlaylist={this.deleteFromPlaylist}
          playlistItem={playlistItem}
          playSong={this.playSong}
          playlistOwnerId={this.props.playlist.user_id} />);
    }.bind(this));
    return (
      <div className="playlist-track-player">
        <div className="playlist-title">{this.props.playlist.title}</div>
        {trackPlayer}
        <div className="playlist-items">
          {playlistItems}
        </div>
      </div>
    );
  }
});

module.exports = PlaylistTrackPlayer;
