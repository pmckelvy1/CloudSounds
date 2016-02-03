var React = require('react');
var TrackPlayerMini = require('../audio/track_player_mini');
var CurrentUserStore = require('../../stores/current_user_store');
var UserStore = require('../../stores/user_store');
var LikeStore = require('../../stores/like_store');

var PlaylistSnapShot = React.createClass({
  getInitialState: function () {
    return { playlist: [] };
  },

  componentDidMount: function () {
    // var storeToken;
    // storeToken = UserStore.addListener(function() {
    //   this.setState({ likedSongs: UserStore.getUserLikedSongs() });
    // }.bind(this));
    this.setState({ likedSongs: LikeStore.getLikedSongs() });
    // this.setState({ storeToken: storeToken });
    var ls = LikeStore.addListener(this.getLikesForSongs);
    this.setState({ lsToken: ls });
  },

  componentWillUnmount: function () {
    if (this.state.lsToken) {
      this.state.lsToken.remove();
    }
  },

  getLikesForSongs: function () {
    // var likedSongIds = [this.state.likedSongs[0], this.state.likedSongs[1], this.state.likedSongs[2]];
    var ls = CurrentUserStore.likedSongs();
    this.setState({ likedSongs: LikeStore.getLikedSongs() });
  },

  render: function () {
    // if (Object.keys(this.state.likedSongs).length === 0) {
    //   return (
    //     <div className="loader">Loading...</div>
    //   );
    // } else {
    var liked_songs = this.state.likedSongs;
    var numLikedSongs = liked_songs.length;
    var likedSongs = [];
    for (var i = 0; i < 3 && i < liked_songs.length; i++) {
      likedSongs.push(<li key={i} ><TrackPlayerMini song={liked_songs[i]} /></li>);
    }
    return (
      <div className="user-likes-snapshot">
        <div className="snapshot-header">
          <h1><i className="fa fa-heart"></i> {numLikedSongs} likes</h1>
        </div>
        <ul className="group">
          {likedSongs}
        </ul>
      </div>
    );
  }
});

module.exports = PlaylistSnapShot;
