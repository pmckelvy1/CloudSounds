var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    TrackPlayer = require('./track_player');

var TrackFeed = React.createClass({
  // getInitialState: function () {
  //   return { tracks: TrackStore.all() };
  // },

  // componentDidMount: function () {
  //   var usToken = UserStore.addListener(function () {
  //     this.setState({ users: UserStore.all() });
  //   }.bind(this));
  //
  //   ApiUtil.fetchUsers();
  //
  //   this.setState({ usToken: usToken });
  // },
  //
  // componentWillUnmount: function () {
  //   this.state.usToken.remove();
  // },

  render: function () {
    // var userItems = this.state.users.map(function(user) {
    //   return <UserItem key={user.id} user={user} />;
    // });
    return (
      <div className="track-feed">
        <TrackPlayer />
        <TrackPlayer />
        <TrackPlayer />
      </div>
    );
  }
});

module.exports = TrackFeed;
