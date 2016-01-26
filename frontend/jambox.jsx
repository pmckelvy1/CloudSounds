var React = require('react');
var ReactDOM = require('react-dom');
var UserFeed = require('./components/user_feed');
var Jambox = React.createClass({

  render: function () {
    return (
      <div>
        <h1 className="test-header">JAMBOX</h1>
        <UserFeed />
      </div>
    );
  }
});


document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<Jambox/>, document.getElementById('root'));
});
