var React = require('react'),
    UserItem = require('./user_item'),
    SongStore = require('../../stores/song_store'),
    ApiUtil = require('../../util/api_util'),
    TrackFeed = require('../audio/track_feed'),
    CurrentUserStore = require('../../stores/current_user_store'),
    SessionsApiUtil = require('../../util/sessions_api_util');

var UserFeed = React.createClass({
  getInitialState: function () {
    return { songs: CurrentUserStore.followedSongs() };
  },

  componentDidMount: function () {
    var ssToken = CurrentUserStore.addListener(function () {
      this.setState({ songs: CurrentUserStore.followedSongs() });
    }.bind(this));

    SessionsApiUtil.fetchCurrentUser();
    this.setState({ ssToken: ssToken });
  },

  componentWillUnmount: function () {
    this.state.ssToken.remove();
  },

  render: function () {
    if (this.state.songs) {
      return (
        <div className="user-feed">
          <TrackFeed songs={this.state.songs} />
        </div>
      );
    } else {
      return (
        <div className="loader">Loading...</div>
      );
    }
    // var userItems = this.state.users.map(function(user) {
    //   return <UserItem key={user.id} user={user} />;
    // });
  }
});

module.exports = UserFeed;
