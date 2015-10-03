var React = require('react/addons');
var Utils = require('./Utils')

var _COMPLETE = "complete";
var _INCOMPLETE = "incomplete";
var _ENTER_KEY = 13;
var _BACKSPACE_KEY = 8;

var TodoItem = React.createClass({
    getInitialState: function(){
      return({
        enable_x_trash: false,
        currentIndex: "None"
      })
    },
    componentDidMount: function(){
      var currentObj = React.findDOMNode(this.refs.spanText);
      var currentCheckbox = React.findDOMNode(this.refs.refcb);
      // var currentSpan = React.findDOMNode(this.refs.refwhole);
      // currentSpan.draggable = true;

      if(this.props.status == _COMPLETE){
        currentObj.style.textDecoration = "line-through";
        currentCheckbox.checked = true;
      }else{
        currentObj.style.textDecoration = "None";
        currentCheckbox.checked = false;
      }
    },
    componentDidUpdate: function(){
      this.componentDidMount();
    },
    handleEdit: function(event){
      // console.log("editing");
      var currentObj = React.findDOMNode(this.refs.spanText);
      var currentSpan = React.findDOMNode(this.refs.refwhole);

      currentSpan.draggable = false;
      currentObj.contentEditable = true;
      currentObj.style.outline = 0;
      // currentObj.innerHTML = currentObj.innerHTML.trim();
      currentObj.focus();
      Utils.setEndOfContentEditable(currentObj);
    },
    trashClick: function(event){
      // event.preventDefault();
      // console.log("removed item");
      this.props.removeTask(this.props.reactKey);
    },
    onBlur: function(){
      var index = this.props.reactKey;

      new_value = React.findDOMNode(this.refs.spanText).textContent.trim();

      React.findDOMNode(this.refs.spanText).contentEditable = false;
      this.props.editTask(index, new_value, 0);

      var currentSpan = React.findDOMNode(this.refs.refwhole);
      currentSpan.draggable = true;
    },
    onKeyDown: function(e){
      var self = this;
      if(e.keyCode == _ENTER_KEY){
        e.preventDefault();
        self.onBlur();
        React.findDOMNode(this.refs.spanText).blur();
        return;
      }else if(e.keyCode == _BACKSPACE_KEY){
        var currentObj = React.findDOMNode(this.refs.spanText);
        if(currentObj.innerHTML == "&nbsp;"){
          e.preventDefault();
          self.trashClick();
          currentObj = React.findDOMNode(this.refs.spanText);
          currentObj.blur();
        }
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
    emitChange: function(event){
      var currentObj = React.findDOMNode(this.refs.spanText);

      if(currentObj.innerHTML == "<br>" || currentObj.innerHTML == ""){
        currentObj.innerHTML = "&nbsp;";
      }

    },
    onDragStart: function(event){
      console.log("dragged start");

      this.props.setDragState(this.props.reactKey, null);
      var currentSpan = React.findDOMNode(this.refs.refwhole);
      event.dataTransfer.setData('text', JSON.stringify(currentSpan));
      currentSpan.style.border="2px solid #039004"; // Green
      currentSpan.style.borderStyle="dashed";
      currentSpan.style.zIndex="1";
      this.state.currentIndex = this.props.reactKey;
      // console.log("Start: " + this.state.currentIndex);
    },
    onDragEnd: function(event){
      event.preventDefault();
    },
    onDrop: function(event){
      console.log("On drop");
      event.preventDefault();
      var currentSpan = React.findDOMNode(this.refs.refwhole);
      currentSpan.style.border="";
      this.props.dragAndDrop();
      this.state.currentIndex = "None";
    },
    onDragOver: function(event){
      // console.log("dragged over");
      event.preventDefault();
      var currentSpan = React.findDOMNode(this.refs.refwhole);

      if(this.props.reactKey == this.state.currentIndex){
        currentSpan.style.border="2px solid #d10f0f"; // Red
      }else{
        currentSpan.style.border="2px solid #043e73"; // Blue
      }
      currentSpan.style.borderStyle="dashed";
      currentSpan.style.zIndex="1";
      this.props.setDragState(null, this.props.reactKey);
      return;
    },
    onDragEnter: function(event){

    },
    onDragLeave: function(event){
      var currentSpan = React.findDOMNode(this.refs.refwhole);
      currentSpan.style.border="";
    },
    onMouseEnter: function(event){
      this.setState({
        enable_x_trash: true
      });
    },
    onMouseLeave: function(event){
      this.setState({
        enable_x_trash: false
      });
    },
    render: function(){
      var temp_x_icon =
      <span
        className='glyphicon glyphicon-remove'
        onClick={this.trashClick}
      />;

      var x_icon = React.addons.createFragment({
        x_icon: temp_x_icon
      });

      return(
          <span ref="refwhole" key={this.props.key}
            reactKey={this.props.reactKey}
            className="list-group-item"
            onDoubleClick={this.handleEdit}
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
                  onBlur={this.onBlur}
                  onKeyDown={this.onKeyDown}
                  onInput={this.emitChange}>
                  {this.props.text}</span>
                <span className="createdAt single-createAt">{this.props.timestamp}</span>
            </div>
            {this.state.enable_x_trash && {x_icon} }
          </span>
      );
    }

});

module.exports = TodoItem;
