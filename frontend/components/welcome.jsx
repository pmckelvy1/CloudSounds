var React = require('react');
var Clouds = require('./clouds');

var Welcome = React.createClass({
  render: function () {
    return (
      <div className="welcome">
        <span>Welcome to </span><span className="blue cloud-sounds">CloudSounds!</span>
      </div>
    );
  }
});

module.exports = Welcome;
