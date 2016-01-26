var UserActions = require('../actions/user_actions');

var ApiUtil = {

  fetchUsers: function () {
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'JSON',
      success: function (users) {
        UserActions.receiveUsers(users);
      }
    });
  }

};

module.exports = ApiUtil;
