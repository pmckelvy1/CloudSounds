var React = require('react'),
    TrackFeed = require('../audio/track_feed'),
    SongStore = require('../../stores/song_store'),
    TrackPlayer = require('../audio/track_player'),
    TrackFeed = require('../audio/track_feed'),
    ApiUtil = require('../../util/api_util'),
    UserStore = require('../../stores/user_store');

var UserTracks = React.createClass({
  getInitialState: function () {
    var userId = this.props.params.id;
    return { userId: userId, songs: UserStore.getUserSongs() };
  },

  componentDidMount: function () {
    var us = UserStore.addListener(function () {
      this.setState({ songs: UserStore.getUserSongs(this.state.userId) });
    }.bind(this));
    this.setState({ usToken: us });
    ApiUtil.getUserSongs(this.state.userId);
  },

  componentWillUnmount: function () {
    this.state.usToken.remove();
  },

  render: function () {
    return (
      <div><TrackFeed songs={this.state.songs} /></div>
    );
  }
});

module.exports = UserTracks;
