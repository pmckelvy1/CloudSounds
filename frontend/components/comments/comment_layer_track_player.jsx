var React = require('react');
var CommentComponentMini = require('./comment_component_mini');
var CommentStore = require('../../stores/comment_store');


var CommentLayer = React.createClass({

  componentDidMount: function () {
    var storeToken = CommentStore.addListener(this.updateComments);
    this.setState({ storeToken: storeToken });
  },

  componentWillUnmount: function () {
    this.state.storeToken.remove();
  },

  updateComments: function () {
    this.setState({});
  },

  render: function () {

    var songLength;
    if (this.props.songLength) {
      songLength = this.props.songLength;
    }
    var comments = CommentStore.getSongComments(this.props.songId);
    var commentsObject = comments.map(function (comment) {
      return <CommentComponentMini key={comment.id} comment={comment}
        songLength={songLength} extendPlayer={this.props.extendPlayer}/>;
    }.bind(this));
    return (
      <div className="comment-layer">
        {commentsObject}
      </div>
    );
  }
});

module.exports = CommentLayer;
