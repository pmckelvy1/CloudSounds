var React = require('react'),
  TrackFeed = require('../audio/track_feed'),
  SongStore = require('../../stores/song_store'),
  TrackPlayer = require('../audio/track_player'),
  TrackFeed = require('../audio/track_feed'),
  ApiUtil = require('../../util/api_util'),
  UserStore = require('../../stores/user_store');

var UserLikes = React.createClass({
  getInitialState: function () {
    var userId = this.props.params.id;
    return { userId: userId, songs: UserStore.getUserLikedSongs() };
  },

  render: function () {
    return (
      <div><TrackFeed songs={this.state.songs} /></div>
    );
  }
});

module.exports = UserLikes;
