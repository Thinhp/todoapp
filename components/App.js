var React = require('react');
var Box = require('./Box');
var TodoList = require('./TodoList');
var TodoNewTask = require('./TodoNewTask');

var App = React.createClass({
  getInitialState: function(){
    // Store the tasks in array
    var taskList = [];


    if(localStorage.taskList){
      taskList = JSON.parse(localStorage.taskList);
    }

    return ({
      taskList: taskList,
      taskDragStartIndex: 0,
      taskDragEndIndex: 0,
    });

  },
  addTask: function(text){  /* add the task to the favorite */
    var taskList = this.state.taskList;

    //Add to tasklist array with Json format
    taskList.push({
      text: text,
      status: "incomplete",
      timestamp: Date()
    });

    //Set the state
    this.setState({
      taskList: taskList
    });

    localStorage.taskList = JSON.stringify(taskList);
  },
  removeTask: function(index){
    console.log("Removed a tasked");
    var taskList = this.state.taskList;
    taskList.splice(index, 1); //Remove from the array

    //refresh the change
    this.setState({
      taskList: taskList
    });

    localStorage.taskList = JSON.stringify(taskList);
  },
  editTask: function(index, text, status){
    console.log("Edited a task");
    var taskList = this.state.taskList;

    if(text != 0){
      taskList[index].text = text;
    }

    if(status != 0){
      taskList[index].status = status;
    }

    this.setState({
      taskList: taskList
    });

    localStorage.taskList = JSON.stringify(taskList);
  },
  setDragState: function(start, end){
    if(start != null){
      this.state.taskDragStartIndex = start;
    }
    if(end != null){
      this.state.taskDragEndIndex = end;
    }
  },
  dragAndDrop: function(){
    var startDragIndex = this.state.taskDragStartIndex;
    var endDragIndex = this.state.taskDragEndIndex;
    var taskList = this.state.taskList;

    if(startDragIndex != endDragIndex){
      console.log("Not equal");

      //Swap those 2 elements
      var temp = taskList[startDragIndex];
      taskList[startDragIndex] = taskList[endDragIndex];
      taskList[endDragIndex] = temp;

      this.setState({
        taskList: taskList
      });

      localStorage.taskList = JSON.stringify(taskList);
    }
  },
  render: function(){
    return(
      <div>
        <h1> TODO </h1>
        <Box addTask={this.addTask} />
        <TodoList
          taskList={this.state.taskList}
          removeTask={this.removeTask}
          editTask={this.editTask}
          setDragState={this.setDragState}
          dragAndDrop={this.dragAndDrop}
        />
      </div>
    );
  }

});

module.exports = App;
