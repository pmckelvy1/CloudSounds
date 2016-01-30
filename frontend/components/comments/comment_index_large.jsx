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
    if (Object.keys(this.state.comments).length === 0) {
      return (
        <div className="loader">Loading...</div>
      );
    } else {
      var comments = this.state.comments.map(function(comment) {
      return <li key={comment.id}><CommentIndexItemLarge comment={comment} /></li>;
      });
      return (
        <div className="comment-index-large">
          <ul>
            {comments}
          </ul>
        </div>
      );
    }
  }
});

module.exports = CommentIndexLarge;
