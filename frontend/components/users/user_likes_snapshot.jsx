var React = require('react');
var TrackPlayerMini = require('../audio/track_player_mini');
var CurrentUserStore = require('../../stores/current_user_store');
var UserStore = require('../../stores/user_store');

var UserLikesSnapshot = React.createClass({
  getInitialState: function () {
    return { likedSongs: {} };
  },

  componentDidMount: function () {
    var storeToken;
    if (this.props.user.id === CurrentUserStore.currentUserId()) {
      storeToken = CurrentUserStore.addListener(function() {
        this.setState({ likedSongs: CurrentUserStore.likedSongs() });
      }.bind(this));
      this.setState({ likedSongs: CurrentUserStore.likedSongs() });
    } else {
      this.setState({ likedSongs: this.props.user.liked_songs });
    }
  },

  componentWillUnmount: function () {
    if (this.state.storeToken) {
      this.state.storeToken.remove();
    }
  },

  render: function () {
    // if (Object.keys(this.state.likedSongs).length === 0) {
    //   return (
    //     <div className="loader">Loading...</div>
    //   );
    // } else {
      var liked_songs = this.state.likedSongs;
      var likedSongs = [];
      for (var i = 0; i < 3 && i < liked_songs.length; i++) {
        likedSongs.push(<li key={i} ><TrackPlayerMini song={liked_songs[i]} /></li>);
      }
      return (
        <div className="user-likes-snapshot">
          <h1>105 Likes</h1>
          <ul className="group">
            {likedSongs}
          </ul>
        </div>
      );
    }
  // }
});

module.exports = UserLikesSnapshot;
