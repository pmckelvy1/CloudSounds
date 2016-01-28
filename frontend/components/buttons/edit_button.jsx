var React = require('react');

var EditButton = React.createClass({


  openEditPanel: function () {

  },

  render: function () {
    return (
      <button className="edit-button" onClick={this.openEditPanel}>Edit</button>
    );
  }

});

module.exports = EditButton;
