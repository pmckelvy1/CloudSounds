var React = require('react'),
    UserStore = require('../../stores/user_store');

var UserInfo = React.createClass({

  render: function () {
    var followingStat;
    var followersStat;
    var songStat;
    if (this.props.user.num_followings.length > 0) {
      followersStat = this.props.user.num_followings;
    } else {
      followersStat = 0;
    }

    if (this.props.user.followed_users.length > 0) {
      followingStat = this.props.user.followed_users.length;
    } else {
      followingStat = 0;
    }

    if (this.props.user.songs.length > 0) {
      songStat = this.props.user.songs.length;
    } else {
      songStat = 0;
    }

    return (
      <div className="user-profile-info">
        <ul className="user-stats group">
          <li>
            <a href="#">
              <span className="stat-title">Following</span><span className="stat">{followingStat}</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="stat-title">Followers</span><span className="stat">{followersStat}</span>
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
