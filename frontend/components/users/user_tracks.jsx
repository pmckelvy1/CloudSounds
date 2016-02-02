var React = require('react'),
    TrackFeed = require('../audio/track_feed'),
    SongStore = require('../../stores/song_store'),
    TrackPlayer = require('../audio/track_player'),
    TrackFeed = require('../audio/track_feed'),
    ApiUtil = require('../../util/api_util'),
    UserStore = require('../../stores/user_store'),
    CurrentUserStore = require('../../stores/current_user_store');

var UserTracks = React.createClass({
  getInitialState: function () {
    var userId = this.props.params.id;
    return { userId: userId, songs: {} };
  },

  componentDidMount: function () {
    var cus;
    // if (this.state.userId == CurrentUserStore.currentUserId()) {
    //   cus = CurrentUserStore.addListener(function () {
    //     this.setState({ songs: CurrentUserStore.getUserSongs() });
    //   }.bind(this));
    //   this.setState({ cusToken: cus });
    //   this.setState({ songs: CurrentUserStore.getUserSongs(this.state.userId) });
    // } else {
      cus = UserStore.addListener(function () {
        this.setState({ songs: UserStore.getUserSongs() });
      }.bind(this));
      this.setState({ cusToken: cus });
      this.setState({ songs: UserStore.getUserSongs(this.state.userId) });
    // }
  },

  componentWillUnmount: function () {
    if (this.state.cusToken) {
      this.state.cusToken.remove();
    }
  },

  render: function () {
    if (Object.keys(this.state.songs).length === 0) {
      return (
        <div className="loader">Loading...</div>
      );
    } else {
      return (
        <div><TrackFeed songs={this.state.songs} /></div>
      );
    }
  }
});

module.exports = UserTracks;
