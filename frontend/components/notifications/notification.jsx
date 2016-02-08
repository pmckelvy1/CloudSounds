var React = require('react');

var Notification = React.createClass({
  getInitialState: function () {
    return { fadeout: false };
  },

  componentDidMount: function () {
    setTimeout(this.setFadout, 4000);
  },

  setFadout: function () {
    this.setState({ fadeout: true });
  },

  render: function () {
    var styling;
    if (this.state.fadeout) {
      styling = 'notification-box group with-fadeout';
    } else {
      styling = 'notification-box group with-fadein';
    }
    var notificationItem = this.props.item;
    if (notificationItem.type === 'Playlist_Item') {
      return (
        <div className={styling}>
          <img className="thumb-notification" src={notificationItem.item.song.image_url} />
          <div className="notification-text">
            {notificationItem.item.song.title} added to playlist
            <div className="blue">{notificationItem.item.playlist_title}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styling}>
        </div>
      );
    }


  }
});

module.exports = Notification;
