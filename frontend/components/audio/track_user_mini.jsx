var React = require('react');
var FollowButton = require('../buttons/follow_button');

var TrackUserMini = React.createClass({

  render: function () {
    var userURL = '#/users/' + this.props.user.id;
    return (
      <div className="track-player-mini">
        <div className="thumb-mini"><img src={this.props.user.image_url}/></div>
        <h1><a href={userURL}>{this.props.user.username}</a></h1>
        <div className="num-followers"><i className="fa fa-users"></i> {this.props.user.num_songs}</div>
        <div className="num-songs"><i className="fa fa-music"></i> {this.props.user.num_songs}</div>
        <FollowButton followedId={this.props.user.id}/>
      </div>
    );
  }

});

module.exports = TrackUserMini;
