var React = require('react');

var TodoItem = React.createClass({
    testonClick: function(){
        console.log("testing");

    },
    render: function(){
        return(
            <span className="list-group-item">
                {this.props.text}
                <span className="createdAt">{this.props.timestamp}</span>
                <span className="glyphicon glyphicon-list-alt" onClick={this.testonClick}></span>
                <span className="glyphicon glyphicon-trash"></span>
            </span>
        );
    }

});

module.exports = TodoItem;
