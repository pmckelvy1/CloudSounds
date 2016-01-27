var React = require('react'),
    UserStore = require('../../stores/user_store');

var UserInfo = React.createClass({

  render: function () {
    return (
      <div className="test-page-text">{this.props.userInfo}</div>
    );
  }
});

module.exports = UserInfo;
