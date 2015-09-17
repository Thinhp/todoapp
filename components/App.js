var React = require('react');
var Box = require('./Box');

var App = React.createClass({
    render: function(){
        return(
            <div>
                <h1> My Todo App</h1>
                <Box />
            </div>
        );
    }

});

module.exports = App;
