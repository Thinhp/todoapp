var React = require('react');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({

  render: function(){
    var self = this;
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
          />
      );

    });
    return(
      <div className="list-group col-xs-12 col-md-8 col-md-offset-2">
        <span className="list-group-item active">
          Your tasks
        </span>
        {taskList}
      </div>
    );
  }

});

module.exports = TodoList;
