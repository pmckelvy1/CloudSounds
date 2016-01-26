var React = require('react'),
    UserStore = require('react');

var UserItem = React.createClass({

  render: function () {
    return (
      <div className="user-item">
        {this.props.user.username}
      </div>
    );
  }
});

module.exports = UserItem;
