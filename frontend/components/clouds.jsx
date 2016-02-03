var React = require('react');

var Clouds = React.createClass({
  render: function () {
    return (
      <div id="clouds">
      	<div className="cloud x1"></div>
      	<div className="cloud x2"></div>
      	<div className="cloud x3"></div>
      	<div className="cloud x4"></div>
      	<div className="cloud x5"></div>
      </div>
    );
  }
});

module.exports = Clouds;
