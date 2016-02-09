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
      case 'Playlist_Item':
        return (
          <div className={styling}>
            <div className="thumb-notification">
              <div className="image-centerer">
                <img src={notificationItem.item.song.image_url} />
              </div>
            </div>
            <div className="notification-text">
              {notificationItem.item.song.title} added to playlist
              <span className="blue">{notificationItem.item.playlist_title}</span>
            </div>
          </div>
        );
      case 'Follow':
        return (
          <div className={styling}>
            <div className="thumb-notification">
              <div className="image-centerer">
                <img src={notificationItem.item.image_url} />
              </div>
            </div>
            <div className="notification-text">
              <span className="blue">{notificationItem.item.username}</span> was added to your followed users
            </div>
          </div>
        );
      case 'Like':
        return (
          <div className={styling}>
            <div className="thumb-notification">
              <div className="image-centerer">
                <img src={notificationItem.item.image_url} />
              </div>
            </div>
            <div className="notification-text">
              <span className="blue">{notificationItem.item.title}</span> was added to your collection
            </div>
          </div>
        );
      case 'Invalid_Playlist_Addition':
        return (
          <div className={styling}>
            <div className="thumb-notification">
              <div className="image-centerer">
                <img src={notificationItem.item.song.image_url} />
              </div>
            </div>
            <div className="notification-text">
              <span className="blue">{notificationItem.item.song.title}</span> could not be added to a second playlist
            </div>
          </div>
        );
    }
  }
});

module.exports = Notification;
