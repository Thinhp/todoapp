var React = require('react');

var TodoItem = React.createClass({
    getInitialState: function(){
      var taskList = [];
        return ({
          taskList: this.props.taskList
        });
    },
    handleEdit: function(event){
      React.findDOMNode(this.refs.spanText).contentEditable = true;
      React.findDOMNode(this.refs.spanText).focus();
    },
    trashClick: function(event){
      event.preventDefault();
      console.log("removed item");
      this.props.removeTask(this.props.reactKey);
    },
    onBlur: function(){
      var index = this.props.reactKey;

      new_value = React.findDOMNode(this.refs.spanText).innerHTML;
      console.log(new_value);

      this.props.editTask(index, new_value);
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
                  onBlur={this.onBlur}>
                  {this.props.text}</span>
                <span className="createdAt single-item">{this.props.timestamp}</span>
                </div>
                <label className="glyphicon glyphicon-trash" onClick={this.trashClick}></label>
            </span>
        );
    }

});

module.exports = TodoItem;
