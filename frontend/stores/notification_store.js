var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    LikeConstants = require('../constants/like_constants'),
    FollowConstants = require('../constants/follow_constants'),
    PlaylistConstants = require('../constants/playlist_constants'),
    CurrentUserConstants = require('../constants/current_user_constants'),
    CurrentUserStore = require('./current_user_store'),
    UserStore = require('./user_store');

var NotificationStore = new Store(Dispatcher);

var _notifications = [];

var addNotification = function (notificationItem) {
  _notifications.push(notificationItem);
};

NotificationStore.getNewNotificationItem = function () {
  var idx = _notifications.length - 1;
  return _notifications[idx];
};

NotificationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PlaylistConstants.ADD_NEW_PLAYLIST:
      addNotification({ type: 'Playlist', item: payload.newPlaylist });
      NotificationStore.__emitChange();
      break;
    case PlaylistConstants.ADD_SONG_TO_PLAYLIST:
      addNotification({ type: 'Playlist_Item', item: payload.addedSongData });
      NotificationStore.__emitChange();
      break;
    case FollowConstants.USER_FOLLOWED:
      addNotification({ type: 'Follow', item: payload.followedUser });
      NotificationStore.__emitChange();
      break;
    case LikeConstants.LIKE_RECEIVED:
      addNotification({ type: 'Like', item: payload.likedSong });
      NotificationStore.__emitChange();
      break;
    case PlaylistConstants.INVALID_PLAYLIST_ADDITION:
      addNotification({ type: 'Invalid_Playlist_Addition', item: payload.playlistItem });
      NotificationStore.__emitChange();
      break;

  }
};

module.exports = NotificationStore;
