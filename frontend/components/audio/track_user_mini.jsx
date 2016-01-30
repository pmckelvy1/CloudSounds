var React = require('react');
var FollowButton = require('../buttons/follow_button');

var TrackUserMini = React.createClass({

  render: function () {
    var userURL = '#/users/' + this.props.user.id;
    return (
      <div className="track-player-mini">
        <div className="thumb-mini"><img src='#'/></div>
        <h1><a href={userURL}>{this.props.user.username}</a></h1>
        <FollowButton className="follow-button" followedId={this.props.user.id}/>
      </div>
    );
  }

});

module.exports = TrackUserMini;
