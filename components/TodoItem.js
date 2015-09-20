var React = require('react');
var Utils = require('./Utils')

var TodoItem = React.createClass({
    handleEdit: function(event){
      var currentObj = React.findDOMNode(this.refs.spanText);
      currentObj.contentEditable = true;
      currentObj.focus();
      Utils(currentObj);
    },
    trashClick: function(event){
      event.preventDefault();
      console.log("removed item");
      this.props.removeTask(this.props.reactKey);
    },
    onBlur: function(){
      var index = this.props.reactKey;

      new_value = React.findDOMNode(this.refs.spanText).innerHTML.trim();
      console.log(new_value);

      React.findDOMNode(this.refs.spanText).contentEditable = false;
      this.props.editTask(index, new_value);
    },
    onKeyDown: function(e){
      var self = this;
      if(e.keyCode == 13){
        e.preventDefault();
        self.onBlur();
        React.findDOMNode(this.refs.spanText).blur();
        return;
      }
    },
    render: function(){
        return(
            <span key={this.props.key}
              className="list-group-item">
                <div id="myId">
                <span
                  id="myText"
                  ref="spanText"
                  className="single-item"
                  onDoubleClick={this.handleEdit}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}>
                  {this.props.text}</span>
                <span className="createdAt single-item">{this.props.timestamp}</span>
                </div>
                <label className="glyphicon glyphicon-trash" onClick={this.trashClick}></label>
            </span>
        );
    }

});

module.exports = TodoItem;
