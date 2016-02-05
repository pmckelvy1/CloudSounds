var React = require("react"),
    ApiActions = require('../../actions/api/api_actions'),
    FollowStore = require('../../stores/follow_store'),
    CurrentUserStore = require('../../stores/current_user_store');

var FollowButton = React.createClass({
  getInitialState: function () {
    return { follows: CurrentUserStore.doesFollow(this.props.followedId) };
  },

  componentDidMount: function () {
    var cus = CurrentUserStore.addListener(function () {
      // set the follow state
      this.setState({ follows: CurrentUserStore.doesFollow(this.props.followedId)});
      // if there is a follow, grab it
      // if (CurrentUserStore.doesFollow(this.props.followedId)) {
      //   this.setState({ followedId: CurrentUserStore.find(this.props.followedId)});
      // }
    }.bind(this));
    this.setState({ cusToken: cus });
  },

  componentWillUnmount: function () {
    this.state.cusToken.remove();
  },

  toggleFollow: function (e) {
    e.preventDefault();
    if (this.state.follows) {
      ApiActions.unFollow(this.props.followedId);
    } else {
      ApiActions.follow(this.props.followedId);
    }
  },

  render: function () {
    var followButton;
    if (CurrentUserStore.currentUserId() === this.props.followedId) {
      followButton = <div></div>;
    } else {      
      if (this.state.follows) {
        followButton = <button className="follow-button followed"
          onClick={this.toggleFollow}>
          Following
        </button>;
      } else {
        followButton = <button className="follow-button not-followed"
          onClick={this.toggleFollow}>
          Follow
        </button>;
      }
    }
    return (
      <div>
        {followButton}
      </div>
    );
  }

});

module.exports = FollowButton;
