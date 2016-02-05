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
    debugger
    return (
      <div className="comment-index-large-user-info">
        <img className="thumb-med" src={this.props.user.image_url} />
        <div className="artist-info-name">{this.props.user.username}</div>
          <div className="num-followers"><i className="fa fa-users"></i> {this.props.user.num_followers}</div>
          <div className="num-songs"><i className="fa fa-music"></i> {this.props.user.num_songs}</div>
        <div className="follow-button-container">
          {followButton}
        </div>
      </div>
    );
  }
});

module.exports = CommentIndexLargeUserInfo;
