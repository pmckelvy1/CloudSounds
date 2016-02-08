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
    var notificationItem = this.props.item;
    var notification;
    if (notificationItem.type === 'Playlist_Item') {
      notification = <div>{notificationItem.item.song.title} added to playlist</div>;
    }

    var styling;
    if (this.state.fadeout) {
      styling = 'notification-box with-fadeout';
    } else {
      styling = 'notification-box with-fadein';
    }

    return (
      <div className={styling}>
        {notification}
      </div>
    );
  }
});

module.exports = Notification;
