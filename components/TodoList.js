var React = require('react');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({
    render: function(){
        var taskList = this.props.taskList.map(function(t){

            return (
                <TodoItem text={t.text} timestamp={t.timestamp}
                    />
            );

        });
        return(
            <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
                <span className="list-group-item active">Your tasks</span>
                {taskList}
            </div>
        );
    }

});

module.exports = TodoList;
