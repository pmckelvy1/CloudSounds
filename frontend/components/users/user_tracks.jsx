var React = require('react'),
    TrackFeed = require('../audio/track_feed'),
    SongStore = require('../../stores/song_store'),
    TrackPlayer = require('../audio/track_player'),
    TrackFeed = require('../audio/track_feed'),
    ApiUtil = require('../../util/api_util');

var UserTracks = React.createClass({
  getInitialState: function () {
    var userId = this.props.params.id;
    return { userId: userId, songs: SongStore.allUserSongs(userId) };
  },

  componentDidMount: function () {
    var ts = SongStore.addListener(function () {
      this.setState({ songs: SongStore.allUserSongs(this.state.userId) });
    }.bind(this));
    this.setState({ tsToken: ts });
    ApiUtil.getUserSongs(this.state.userId);
  },

  componentWillUnmount: function () {
    this.state.tsToken.remove();
  },

  render: function () {
    return (
      <div><TrackFeed songs={this.state.songs} /></div>
    );
  }
});

module.exports = UserTracks;
