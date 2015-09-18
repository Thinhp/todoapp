var React = require('react');

var TodoItem = React.createClass({
    editClick: function(){
        console.log(this.props.reactKey);
    },
    render: function(){
        return(
            <span key={this.props.key} reactKey={this.props.reactkey}
              className="list-group-item">
                <span className="single-item">{this.props.text}</span>
                <span className="createdAt single-item">{this.props.timestamp}</span>
                <span className="glyphicon glyphicon-list-alt" onClick={this.editClick}></span>
                <span className="glyphicon glyphicon-trash"></span>
            </span>
        );
    }

});

module.exports = TodoItem;
