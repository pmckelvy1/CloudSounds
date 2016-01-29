var React = require("react"),
    ApiActions = require('../../actions/api/api_actions'),
    CurrentUserStore = require('../../stores/current_user_store');

var LikeButton = React.createClass({
  getInitialState: function () {
    return { likes: CurrentUserStore.doesLike(this.props.songId) };
  },

  componentDidMount: function () {
    var cus = CurrentUserStore.addListener(function () {
      // set the like state
      this.setState({ likes: CurrentUserStore.doesLike(this.props.songId)});
      // if there is a like, grab it
      // if (CurrentUserStore.doesLike(this.props.songId)) {
      //   this.setState({ like: CurrentUserStore.find(this.props.songId)});
      // }
    }.bind(this));
    this.setState({ cusToken: cus });
  },

  componentWillUnmount: function () {
    this.state.cusToken.remove();
  },

  toggleFollow: function (e) {
    e.preventDefault();
    if (this.state.likes) {
      ApiActions.unLike(this.props.songId);
    } else {
      ApiActions.like(this.props.songId);
    }
  },

  render: function () {
    var likeButtonText;
    if (this.state.likes) {
      likeButtonText = "♥";
    } else {
      likeButtonText = "♡";
    }
    return (
      <button className="like-button" onClick={this.toggleFollow}>{likeButtonText}</button>
    );
  }

});

module.exports = LikeButton;
