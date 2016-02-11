var React = require('react'),
    LinkedState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util'),
    CurrentPlayingSongStore = require('../../stores/current_playing_song_store');

var CommentInputBox = React.createClass({
  mixins: [LinkedState],

  getInitialState: function () {
    return { body: "" };
  },

  submit: function (e) {
    e.preventDefault();
    var commentData = {
      body: this.state.body,
      song_id: this.props.songId,
      time_stamp: Math.fround(CurrentPlayingSongStore.getCurrentTime(this.props.songId))
    };
    ApiUtil.createComment(commentData, this.clearForm);
  },

  getTimeStamp: function () {

  },

  clearForm: function () {
    this.setState({ body: "" });
  },

  render: function () {
    return (
      <div className="comment-input-box">
        <form onSubmit={this.submit}>
          <input id="body" type="text" onInput={this.getTimeStamp} className="comment-body-input" valueLink={this.linkState('body')}></input>
        </form>
    </div>
    );
  }
});

module.exports = CommentInputBox;
