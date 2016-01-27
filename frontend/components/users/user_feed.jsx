var React = require('react'),
    UserItem = require('./user_item'),
    SongStore = require('../../stores/song_store'),
    ApiUtil = require('../../util/api_util'),
    TrackFeed = require('../audio/track_feed');

var UserFeed = React.createClass({
  getInitialState: function () {
    return { songs: SongStore.all() };
  },

  componentDidMount: function () {
    var ssToken = SongStore.addListener(function () {
      this.setState({ songs: SongStore.all() });
    }.bind(this));

    ApiUtil.fetchUsers();
    ApiUtil.fetchAllSongs();
    this.setState({ ssToken: ssToken });
  },

  componentWillUnmount: function () {
    this.state.ssToken.remove();
  },

  render: function () {
    // var userItems = this.state.users.map(function(user) {
    //   return <UserItem key={user.id} user={user} />;
    // });
    return (
      <div className="user-feed">
        <TrackFeed songs={this.state.songs} />
      </div>
    );
  }
});

module.exports = UserFeed;
