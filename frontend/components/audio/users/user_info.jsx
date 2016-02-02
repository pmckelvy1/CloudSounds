var React = require('react'),
    UserStore = require('../../stores/user_store');

var UserInfo = React.createClass({

  render: function () {
    var followingStat;
    var followersStat;
    var songStat;
    if (this.props.user.num_followers > 0) {
      followersStat = this.props.user.num_followers;
    } else {
      followersStat = 0;
    }

    if (this.props.user.num_followed_users > 0) {
      followingStat = this.props.user.num_followed_users;
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
          <li className="stat-border">
            <a href="#">
              <span className="stat-title">Followers</span><span className="stat">{followersStat}</span>
            </a>
          </li>
          <li className="stat-border">
            <a href="#">
              <span className="stat-title">Tracks</span><span className="stat">{songStat}</span>
            </a>
          </li>
        </ul>
        <div className="user-info-text">{this.props.user.info}</div>
      </div>
    );
  }
});

module.exports = UserInfo;
