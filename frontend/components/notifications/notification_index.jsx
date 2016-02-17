var React = require('react');
var NotificationStore = require('../../stores/notification_store');
var Notification = require('./notification');

var NotificationIndex = React.createClass({
  getInitialState: function () {
    return { notifications: [] };
  },

  componentDidMount: function () {
    var storeToken = NotificationStore.addListener(this.getNewItem);
    this.setState({ storeToken: storeToken });
  },

  componentWillUnmount: function () {
    this.state.storeToken.remove();
  },

  getNewItem: function () {
    var newItem = NotificationStore.getNewNotificationItem();
    var currentItems = this.state.notifications;
    currentItems.push(newItem);
    this.setState({ notifications: currentItems });
    setTimeout(this.clearOneItem, 5000);
  },

  clearOneItem: function () {
    var currentItems = this.state.notifications;
    currentItems.shift();
    this.setState({ notifications: currentItems });
  },

  render: function () {
    var key;
    var notificationIndexItems = this.state.notifications.map(function(notification_item) {
      key = notification_item.item.id || Math.random(1000);
      return <Notification key={key} item={notification_item} />;
    });
    return (
      <div className="notifications-index group">
        {notificationIndexItems}
      </div>
    );
  }

});

module.exports = NotificationIndex;
