var React = require('react');
var TrackPlayerMini = require('../audio/track_player_mini');
var CurrentUserStore = require('../../stores/current_user_store');
var UserStore = require('../../stores/user_store');

var UserLikesSnapshot = React.createClass({
  getInitialState: function () {
    return { likedSongs: {} };
  },

  componentDidMount: function () {
    // var storeToken;
    // storeToken = UserStore.addListener(function() {
    //   this.setState({ likedSongs: UserStore.getUserLikedSongs() });
    // }.bind(this));
    this.setState({ likedSongs: UserStore.getUserLikedSongs() });
    // this.setState({ storeToken: storeToken });
  },

  // componentWillUnmount: function () {
  //   if (this.state.storeToken) {
  //     this.state.storeToken.remove();
  //   }
  // },

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
  // }
});

module.exports = UserLikesSnapshot;
