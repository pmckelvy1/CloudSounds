var React = require('react'),
    UserItem = require('./user_item'),
    UserStore = require('../stores/user_store'),
    ApiUtil = require('../util/api_util');

var UserFeed = React.createClass({
  getInitialState: function () {
    return { users: UserStore.all() };
  },

  componentDidMount: function () {
    var usToken = UserStore.addListener(function () {
      this.setState({ users: UserStore.all() });
    }.bind(this));

    ApiUtil.fetchUsers();

    this.setState({ usToken: usToken });
  },

  componentWillUnmount: function () {
    this.state.usToken.remove();
  },

  render: function () {
    var userItems = this.state.users.map(function(user) {
      return <UserItem key={user.id} user={user} />;
    });
    return (
      <div className="user-feed">
        {userItems}
      </div>
    );
  }
});

module.exports = UserFeed;
