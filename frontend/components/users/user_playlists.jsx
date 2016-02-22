var React = require('react'),
    TrackFeed = require('../audio/track_feed'),
    SongStore = require('../../stores/song_store'),
    TrackPlayer = require('../audio/track_player'),
    TrackFeed = require('../audio/track_feed'),
    ApiUtil = require('../../util/api_util'),
    UserStore = require('../../stores/user_store'),
    CurrentUserStore = require('../../stores/current_user_store'),
    PlaylistFeed = require('../playlists/playlist_feed');

var UserPlaylists = React.createClass({
  getInitialState: function () {
    var userId = this.props.params.id;
    return { userId: userId, playlists: null };
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
        this.setState({ playlists: UserStore.getPlaylists() });
      }.bind(this));
      this.setState({ cusToken: cus, playlists: UserStore.getPlaylists(this.state.userId) });
    // }
  },

  componentWillUnmount: function () {
    if (this.state.cusToken) {
      this.state.cusToken.remove();
    }
  },

  render: function () {
    if (this.state.playlists) {
      return (
        <div><PlaylistFeed playlists={this.state.playlists} /></div>
      );
    } else {
      return (
        <div className="loader"></div>
      );
    }
  }
});

module.exports = UserPlaylists;
