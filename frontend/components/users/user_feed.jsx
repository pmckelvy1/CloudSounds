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

  followRandomUsers: function () {
    var randomIds = [];
    var id;
    while(randomIds.length < 3) {
      id = Math.floor(Math.random() * 14.9999);
      if (!randomIds.includes(id)) {
        randomIds.push(id);
      }
    }
    ApiUtil.followRandomUsers(randomIds);
  },

  render: function () {
    if (this.state.songs.length > 0) {
      return (
        <div className="user-feed">
        <div className="user-feed-header">Hear the latest posts from the people you're following</div>
          <TrackFeed songs={this.state.songs} />
        </div>
      );
    } else {
      return (
        <div className="user-feed">
          <div className="user-feed-header">New to <span className="blue">CloudSounds</span>? Use the searchbar to find some artists to follow, or simply click below!</div>
          <button onClick={this.followRandomUsers} className="get-random-songs-button">Explore!</button>
      </div>
      );
    }
    // var userItems = this.state.users.map(function(user) {
    //   return <UserItem key={user.id} user={user} />;
    // });
  }
});

module.exports = UserFeed;
