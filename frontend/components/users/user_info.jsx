var React = require('react'),
    UserStore = require('../../stores/user_store');

var UserInfo = React.createClass({

  render: function () {
    var followingStat;
    var followedStat;
    var songStat;

    if (this.props.user.followings > 0) {
      followingStat = this.props.user.followings.length;
    } else {
      followingStat = 0;
    }

    if (this.props.user.followed_users > 0) {
      followingStat = this.props.user.followed_users.length;
    } else {
      followedStat = 0;
    }

    if (this.props.user.songs > 0) {
      followingStat = this.props.user.songs.length;
    } else {
      songStat = 0;
    }

    return (
      <div className="user-profile-info">
        <ul className="user-stats group">
          <li>
            <a href="#">
              <span className="stat-title">Following</span><span className="stat">{followedStat}</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="stat-title">Followers</span><span className="stat">{followingStat}</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="stat-title">Tracks</span><span className="stat">{songStat}</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = UserInfo;
