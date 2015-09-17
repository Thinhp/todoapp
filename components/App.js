var React = require('react');
var Box = require('./Box');
var TodoList = require('./TodoList');

var App = React.createClass({
    getInitialState: function(){
        // Store the tasks in array
        localStorage.clear();
        var taskList = [];

        if(localStorage.taskList){
            taskList = JSON.parse(localStorage.taskList);
        }

        return ({
            taskList: taskList
        });

    },
    addTask: function(text){  /* add the task to the favorite */
        var taskList = this.state.taskList;

        //Add to tasklist array with Json format
        taskList.push({
            text: text,
            timestamp: Date()
        });

        //Set the state 
        this.setState({
            taskList: taskList
        });

        localStorage.taskList = JSON.stringify(taskList);
    },
    removeTask: function(index){
        var taskList = this.state.taskList;
        taskList[index].splice(index, 1);
        this.setState({
            taskList: taskList
        });
        localStorage.taskList = JSON.stringify(taskList);
    },
    render: function(){
        return(
            <div>
                <h1> My Todo App</h1>
                <Box storeTask={this.addTask} />
                <TodoList taskList={this.state.taskList} />
            </div>
        );
    }

});

module.exports = App;
