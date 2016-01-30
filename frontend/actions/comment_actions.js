var Dispatcher = require('../dispatcher/dispatcher');
var CommentConstants = require('../constants/comment_constants');

var CommentActions = {
  receiveComment: function(comment) {
    Dispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_NEW_COMMENT,
      comment: comment
    });
  }
};

module.exports = CommentActions;
