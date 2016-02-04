var React = require('react');
var CommentStore = require('../../stores/comment_store');
var CommentIndexItemLarge = require('./comment_index_item_large');

var CommentIndexLarge = React.createClass({
  getInitialState: function () {
    return { comments: {} };
  },

  componentDidMount: function () {
    var cs = CommentStore.addListener(this.onChange);
    this.setState({ csToken: cs });
  },

  componentWillUnmount: function () {
    this.state.csToken.remove();
  },

  onChange: function () {
    this.setState({ comments: CommentStore.getSongComments(this.props.songId) });
  },

  render: function () {
    var comments;
    if (this.state.comments) {
      if (Object.keys(this.state.comments).length === 0) {
        comments = <div className="loader"></div>;
      } else {
        comments = this.state.comments.map(function(comment) {
          return <li key={comment.id}>
            <CommentIndexItemLarge comment={comment} />
          </li>;
        });
      }
    } else {
      comments = <div className="leave-a-comment">Leave a comment!</div>;
    }
    return (
      <div className="comment-index-large group">
        <div className="comment-index-header">
          <i className="fa fa-comment"></i> {comments.length} comments
        </div>
        <ul>
          {comments}
        </ul>
      </div>
    );
  }
});

module.exports = CommentIndexLarge;
