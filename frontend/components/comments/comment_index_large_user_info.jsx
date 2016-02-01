var React = require('react');
var FollowButton = require('../buttons/follow_button');
var CurrentUserStore = require('../../stores/current_user_store');

var CommentIndexLargeUserInfo = React.createClass({

  render: function () {
    var followButton;
    if (CurrentUserStore.currentUserId() === this.props.user.id) {
      followButton = "";
    } else {
      followButton = <FollowButton followedId={this.props.user.id} />;
    }
    return (
      <div className="comment-index-large-user-info">
        <img className="thumb-med" src={this.props.user.image_url} />
        <div className="artist-info-name">{this.props.user.username}</div>
        <div className="follow-button-container">
          {followButton}
        </div>
      </div>
    );
  }
});

module.exports = CommentIndexLargeUserInfo;
