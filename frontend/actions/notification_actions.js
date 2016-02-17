var NotificationConstants = require('../constants/notification_constants'),
    Dispatcher = require('../dispatcher/dispatcher');

var NotificationActions = {
  invalidPlaylistCreation: function (response) {
    Dispatcher.dispatch({
      actionType: NotificationConstants.INVALID_PLAYLIST_CREATION,
      message: JSON.parse(response.responseText)
    });
  }
};

module.exports = NotificationActions;
