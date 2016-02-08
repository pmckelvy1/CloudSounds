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
    switch (notificationItem.type) {
      case 'Playlist_item':
        return (
          <div className={styling}>
            <img className="thumb-notification" src={notificationItem.item.song.image_url} />
            <div className="notification-text">
              {notificationItem.item.song.title} added to playlist
              <div className="blue">{notificationItem.item.playlist_title}</div>
            </div>
          </div>
        );
      case 'Follow':
        return (
          <div className={styling}>
            <img className="thumb-notification" src={notificationItem.item.image_url} />
            <div className="notification-text">
              <div className="blue">{notificationItem.item.username}</div> was added to your followed users
            </div>
          </div>
        );
      case 'Like':
        return (
          <div className={styling}>
            <img className="thumb-notification" src={notificationItem.item.image_url} />
            <div className="notification-text">
              <div className="blue">{notificationItem.item.title}</div> was added to your collection
            </div>
          </div>
        );
    }
  }
});

module.exports = Notification;
