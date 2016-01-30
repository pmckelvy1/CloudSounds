var React = require('react'),
    LinkedState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util');

var CommentInputBox = React.createClass({
  mixins: [LinkedState],

  getInitialState: function () {
    return { body: "" , song_id: this.props.songId };
  },

  submit: function (e) {
    e.preventDefault();
    ApiUtil.createComment(this.state, this.clearForm);
  },

  clearForm: function () {
    this.setState({ body: "" });
  },

  render: function () {
    return (
      <div className="comment-input-box">
        <form onSubmit={this.submit}>
          <input id="body" type="text" className="comment-body-input" valueLink={this.linkState('body')}></input>
        </form>
    </div>
    );
  }
});

module.exports = CommentInputBox;
