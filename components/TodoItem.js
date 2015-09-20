var React = require('react');
var Utils = require('./Utils')

var _COMPLETE = "complete";
var _INCOMPLETE = "incomplete"

var TodoItem = React.createClass({
    componentWillMount: function(){
      var taskList = this.props.taskList;
    },
    handleEdit: function(event){
      var currentObj = React.findDOMNode(this.refs.spanText);
      currentObj.contentEditable = true;
      currentObj.focus();
      Utils.setEndOfContentEditable(currentObj);
    },
    trashClick: function(event){
      event.preventDefault();
      console.log("removed item");
      this.props.removeTask(this.props.reactKey);
    },
    onBlur: function(){
      var index = this.props.reactKey;

      new_value = React.findDOMNode(this.refs.spanText).innerHTML.trim();

      React.findDOMNode(this.refs.spanText).contentEditable = false;
      this.props.editTask(index, new_value, 0);
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
    checkBoxClick: function(event){
      var currentObj = React.findDOMNode(this.refs.spanText);
      var currentText = currentObj.innerHTML;
      var index = this.props.reactKey;

      if(event.target.checked){
        currentObj.style.textDecoration = "line-through";
        this.props.editTask(index, 0, _COMPLETE);
      }else{
        currentObj.style.textDecoration = "None";
        this.props.editTask(index, 0, _INCOMPLETE);
      }
    },
    render: function(){
        return(
            <span key={this.props.key}
              className="list-group-item">
              <input className="single-checkbox" type="checkbox" onClick={this.checkBoxClick} />
                <div id="myId">
                <span
                  id="myText"
                  ref="spanText"
                  className="single-item"
                  onDoubleClick={this.handleEdit}
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}>
                  {this.props.text}</span>
                <span className="createdAt single-createAt">{this.props.timestamp}</span>
                </div>
                <label className="glyphicon glyphicon-trash" onClick={this.trashClick}></label>
            </span>
        );
    }

});

module.exports = TodoItem;
