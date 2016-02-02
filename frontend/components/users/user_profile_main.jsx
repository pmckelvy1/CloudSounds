var React = require('react');

var UserProfileMain = React.createClass({

  render: function () {
    return (
      <div className="profile-content group">
        {this.props.children}
      </div>
    );
  }
});

module.exports = UserProfileMain;
