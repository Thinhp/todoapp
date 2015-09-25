var React = require('react');

var TodoNewTask = React.createClass({
  onClick: function(){
    var obj = React.findDOMNode(this.refs.newTaskSpanText);
    obj.contentEditable = true;
    obj.innerHTML = "&nbsp";
    obj.style.color = "#1c1f1f";
    obj.style.outline = 0;
    obj.focus();
  },
  onMouseOver: function(event){
    var obj = React.findDOMNode(this.refs.newTaskwhole);
    obj.style.cursor = "pointer";
  },
  onBlur: function(e){
    console.log("texting blur");
    var obj = React.findDOMNode(this.refs.newTaskSpanText);
    if(obj.textContent.trim() != ""){
      //Handle adding task
      this.props.addTask(obj.textContent.trim());
    }
    obj.innerHTML = "";
    obj.blur();
    obj.innerHTML = "Add new task"
    obj.style.color= "#aaa8a8";
  },
  onKeyDown: function(e){
    var self = this;
    if(e.keyCode == 13){
      e.preventDefault();
      self.onBlur();
      return;
    }
  },
  render: function(){
    return(
      <span
      ref="newTaskwhole"
      className="list-group-item"
      onClick={this.onClick}
      onMouseOver={this.onMouseOver}>
      <div id="newTaskId">
        <span
          id="newTaskSpanId"
          ref="newTaskSpanText"
          className="single-new-task"
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}>
          Add new Task
        </span>
      </div>
      </span>
    );
  }
});

module.exports = TodoNewTask;
