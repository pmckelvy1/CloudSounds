var React = require('react');

var CommentIndexItemLarge = React.createClass({

  render: function () {
    return (
      <div className="comment-index-item-large">{this.props.comment.body}</div>
    );
  }
});

module.exports = CommentIndexItemLarge;
