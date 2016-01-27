var React = require('react');

var UserFollowsSnapshot = React.createClass({

  render: function () {
    return (
      <div className="user-likes-snapshot">
        <h1>309 Following</h1>
        <ul>
          <li className="test-page-text-smaller">USER 1</li>
          <li className="test-page-text-smaller">USER 2</li>
          <li className="test-page-text-smaller">USER 3</li>
        </ul>
      </div>
    );
  }
});

module.exports = UserFollowsSnapshot;
