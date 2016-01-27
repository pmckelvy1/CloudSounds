var React = require("react"),
    ApiActions = require('../../actions/api/api_actions'),
    FollowStore = require('../../stores/follow_store');

var FollowButton = React.createClass({
  getInitialState: function () {
    return { follows: FollowStore.doesFollow(this.props.followedId) };
  },

  componentDidMount: function () {
    var fs = FollowStore.addListener(function () {
      // set the follow state
      this.setState({ follows: FollowStore.doesFollow(this.props.followedId)});
      // if there is a follow, grab it
      if (FollowStore.doesFollow(this.props.followedId)) {
        this.setState({ follow: FollowStore.find(this.props.followedId)});
      }
    }.bind(this));
    this.setState({ fsToken: fs });
  },

  componentWillUnmount: function () {
    this.state.fsToken.remove();
  },

  toggleFollow: function (e) {
    e.preventDefault();
    if (this.state.follows) {
      ApiActions.unFollow(this.state.follow);
    } else {
      ApiActions.follow(this.props.followedId);
    }
  },

  render: function () {
    var followButtonText;
    if (this.state.follows) {
      followButtonText = "Following";
    } else {
      followButtonText = "Follow";
    }
    return (
      <button className="follow-button" onClick={this.toggleFollow}>{followButtonText}</button>
    );
  }

});

module.exports = FollowButton;
