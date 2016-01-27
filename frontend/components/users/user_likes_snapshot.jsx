var React = require('react');

var UserLikesSnapshot = React.createClass({

  render: function () {
    return (
      <div className="user-likes-snapshot">
        <h1>105 Likes</h1>
        <ul>
          <li className="test-page-text-smaller">TRACK 1</li>
          <li className="test-page-text-smaller">TRACK 2</li>
          <li className="test-page-text-smaller">TRACK 3</li>
        </ul>
      </div>
    );
  }
});

module.exports = UserLikesSnapshot;
