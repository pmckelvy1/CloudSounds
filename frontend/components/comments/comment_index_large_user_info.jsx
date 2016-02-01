var React = require('react');
var FollowButton = require('../buttons/follow_button');

var CommentIndexLargeUserInfo = React.createClass({

  render: function () {
    return (
      <div className="comment-index-large-user-info">
        <img className="thumb-med" src={this.props.user.image_url} />
        <div className="artist-info-name">{this.props.user.username}</div>
        <div className="follow-button-container">
          <FollowButton followedId={this.props.user.id} />
        </div>
      </div>
    );
  }
});

module.exports = CommentIndexLargeUserInfo;
