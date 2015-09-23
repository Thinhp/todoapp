var React = require('react');
var TodoItem = require('./TodoItem');
var TodoNewTask = require('./TodoNewTask');

var TodoList = React.createClass({
  getInitialState: function(){
    return({
      currentIndex: "None"
    })
  },
  render: function(){
    var self = this;

    //HandleChange for span

    var taskList = this.props.taskList.map(function(t,index){

      return (
        <TodoItem
          key={index}
          reactKey={index}
          text={t.text}
          status={t.status}
          timestamp={t.timestamp}
          removeTask={self.props.removeTask}
          editTask={self.props.editTask}
          setDragState={self.props.setDragState}
          dragAndDrop={self.props.dragAndDrop}
          currentIndex={self.state.currentIndex}
          />
      );

    });

    return(
      <div className="list-group col-xs-12 col-md-8 col-md-offset-2">
        {taskList}
        <TodoNewTask addTask={this.props.addTask}/>
      </div>
    );
  }

});

module.exports = TodoList;
