var React = require('react');

var CommentIndexItemLarge = React.createClass({

  render: function () {
    var user_url = '#/users/' + this.props.comment.user.id;
    var timeStamp = this._timeFormatting(Math.round(this.props.comment.time_stamp));
    return (
      <div className="comment-index-item-large">
        <div className="thumb-mini">
          <div className="image-centerer">
            <img src={this.props.comment.user.image_url} />
          </div>
        </div>
        <div className="comment-user-name"><a href={user_url}>{this.props.comment.user.username}</a></div>
        <div className="says-at"> says at {timeStamp}:</div>
        <div className="comment-body-large">{this.props.comment.body}</div>
      </div>
    );
  },

  _timeFormatting: function (number) {
    var hour, min, sec;
    if (number > 3600) {
      hour = Math.floor((number / 3600));
      min = Math.floor((number / 60));
      if (min < 10) {
        min = '0' + min;
      }
      sec = (number % 60);
      if (sec < 10) {
        sec = '0' + sec;
      }
      return hour + ':' + min + ':' + sec;
    } else {
      min = Math.floor((number / 60));
      sec = (number % 60);
      if (sec < 10) {
        sec = '0' + sec;
      }
      return min + ':' + sec;
    }
  }
});

module.exports = CommentIndexItemLarge;
