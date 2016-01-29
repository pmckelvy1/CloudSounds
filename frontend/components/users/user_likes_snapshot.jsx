var React = require('react');
var TrackPlayerMini = require('../audio/track_player_mini');

var UserLikesSnapshot = React.createClass({

  render: function () {
    var liked_songs = this.props.user.liked_songs;
    var likedSongs = [];
    for (var i = 0; i < 3 && i < liked_songs.length; i++) {
      likedSongs.push(<li><TrackPlayerMini song={liked_songs[i]} /></li>);
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
});

module.exports = UserLikesSnapshot;
