var React = require('react');
var Utils = require('./Utils')

var _COMPLETE = "complete";
var _INCOMPLETE = "incomplete"

var TodoItem = React.createClass({
    componentDidMount: function(){
      var currentObj = React.findDOMNode(this.refs.spanText);
      var currentCheckbox = React.findDOMNode(this.refs.refcb);

      if(this.props.status == _COMPLETE){
        currentObj.style.textDecoration = "line-through";
        currentCheckbox.checked = true;
      }else{
        currentObj.style.textDecoration = "None";
      }
    },
    handleEdit: function(event){
      console.log("editing");
      var currentObj = React.findDOMNode(this.refs.spanText);
      var currentSpan = React.findDOMNode(this.refs.refwhole);

      currentSpan.draggable = false;
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

      new_value = React.findDOMNode(this.refs.spanText).innerText.trim();
      console.log(new_value);

      React.findDOMNode(this.refs.spanText).contentEditable = false;
      this.props.editTask(index, new_value, 0);

      var currentSpan = React.findDOMNode(this.refs.refwhole);
      currentSpan.draggable = true;
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
    onDragStart: function(event){
      console.log("dragged start");
      console.log(this.props.reactKey);
      this.props.setDragState(this.props.reactKey, null);
    },
    onDragEnd: function(event){
      console.log("dragged end");
      event.preventDefault();
    },
    onDrop: function(event){
      console.log("On drop");
      event.preventDefault();
      var currentSpan = React.findDOMNode(this.refs.refwhole);
      currentSpan.style.border="";
      this.props.dragAndDrop();
    },
    onDragOver: function(event){
      // console.log("dragged over");
      event.preventDefault();
      var currentSpan = React.findDOMNode(this.refs.refwhole);
      currentSpan.style.border="2px solid blue";
      currentSpan.style.borderStyle="dashed";
      currentSpan.style.zIndex="1";
      this.props.setDragState(null, this.props.reactKey);
      return;
    },
    onDragEnter: function(event){
      // console.log("drag enter");
    },
    onDragLeave: function(event){
      // console.log("drag exit");
      var currentSpan = React.findDOMNode(this.refs.refwhole);
      currentSpan.style.border="";
    },
    onMouseEnter: function(event){
      // console.log("mouse enter");
    },
    onMouseLeave: function(event){
      // console.log("mouse leave");
    },
    render: function(){
        return(
            <span ref="refwhole" key={this.props.key}
              reactKey={this.props.reactKey}
              className="list-group-item"
              onDragStart={this.onDragStart}
              onDragEnd={this.onDragEnd}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
              onDragEnter={this.onDragEnter}
              onDragLeave={this.onDragLeave}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              draggable="true">
              <input ref="refcb" className="single-checkbox" type="checkbox" onClick={this.checkBoxClick} />
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
