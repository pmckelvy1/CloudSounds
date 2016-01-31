var React = require('react');

var CommentIndexItemLarge = React.createClass({

  render: function () {
    var user_url = '#/users/' + this.props.comment.user.id;
    return (
      <div className="comment-index-item-large">
        <img className="thumb-mini" src={this.props.comment.user.image_url} />
        <div className="comment-user-name"><a href={user_url}>{this.props.comment.user.username}</a></div>
        <div className="says-at"> says at </div>
        <div className="comment-body-large">{this.props.comment.body}</div>
      </div>
    );
  }
});

module.exports = CommentIndexItemLarge;
