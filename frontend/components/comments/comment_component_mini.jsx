var React = require('react');

var CommentComponentMini = React.createClass({

  render: function () {
    var left;
    if (this.props.songLength) {
      left = (parseInt(this.props.comment.time_stamp) / this.props.songLength ) * 645;
    }
    var leftStyle = { left: left };

    var body = <div className="comment-component-innards group open-comment">
        <div className="comment-component-username">{this.props.comment.user.username}:</div>
        <div className="comment-component-body">{this.props.comment.body}</div>
      </div>;

    return (
      <div className="comment-component-mini" style={leftStyle}
        onMouseEnter={this.setHovering} onMouseLeave={this.unSetHovering}>
        <img className="thumb-super-mini" src={this.props.comment.user.image_url}/>
        {body}
      </div>
    );
  }
});

module.exports = CommentComponentMini;
