var React = require('react');
var CommentStore = require('../../stores/comment_store');
var CommentIndexItemLarge = require('./comment_index_item_large');
var Infinite = require('react-infinite');

var CommentIndexLarge = React.createClass({
  getInitialState: function () {
    return { comments: this.buildComments(0, 10),
              isInfiniteLoading: false,
              hasComments: CommentStore.hasComments(this.props.songId) };
  },

  componentDidMount: function () {
    var cs = CommentStore.addListener(this.onChange);
    this.setState({ csToken: cs });
  },

  componentWillUnmount: function () {
    this.state.csToken.remove();
  },

  onChange: function () {
    this.setState({ comments: this.buildComments(0,1).concat(this.state.comments),
                    hasComments: CommentStore.hasComments(this.props.songId) });
  },

  buildComments: function (start, end) {
    var commentObjects;
    if (CommentStore.hasComments(this.props.songId)) {
      var comments = CommentStore.getSongComments(this.props.songId, start, end);
      commentObjects = comments.map(function(comment) {
        return <li key={comment.id}>
          <CommentIndexItemLarge comment={comment} />
        </li>;
      });
    }
    return commentObjects;
  },

  canInfiniteLoad: function () {
    return !(this.state.comments.length === CommentStore.getNumComments(this.props.songId));
  },

  infiniteLoading: function () {
    if (this.canInfiniteLoad()) {
      return (
        <div className="loader"></div>
      );
    } else {
      return (
        <div className="page-bottom">
          <i className="fa fa-cloud center grey"></i>
        </div>
      );
    }
  },

  handleInfiniteLoad: function () {
    if (this.canInfiniteLoad()) {
      this.setState({ isInfiniteLoading: true });
      setTimeout(function () {
        var numComments = this.state.comments.length;
        var newComments = this.buildComments(numComments, numComments + 10);
        this.setState({ comments: this.state.comments.concat(newComments),
          isInfiniteLoading: false });
        }.bind(this), 1000);
    }
  },

  render: function () {
    var comments;
    if (this.state.hasComments) {
      comments = <Infinite className="track-feed"
                elementHeight={50}
                useWindowAsScrollContainer={true}
                infiniteLoadBeginEdgeOffset={100}
                onInfiniteLoad={this.handleInfiniteLoad}
                loadingSpinnerDelegate={this.infiniteLoading()}
                isInfiniteLoading={this.state.isInfiniteLoading}>
                {this.state.comments}
      </Infinite>;
    } else {
      comments = <div className="leave-a-comment">Leave a comment!</div>;
    }
    return (
      <div className="comment-index-large group">
        <div className="comment-index-header">
          <i className="fa fa-comment"></i> {CommentStore.getNumComments(this.props.songId)} comments
        </div>
        {comments}
      </div>
    );
  }
});

module.exports = CommentIndexLarge;
