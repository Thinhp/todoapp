var React = require('react');

var Box = React.createClass({
    getInitialState: function(){
        return({ 
            value: ''
        });
    },
    handleChange: function(event) {
        this.setState({
            value: event.target.value
        });
    },
    handleSubmit: function(event){

        event.preventDefault();
        console.log(this.state.value);

        // When the form is submitted, call the onSearch callback that is passed to the component
        //this.props.onSearch(this.state.value);
        this.getDOMNode().querySelector('input').blur();
    },
    render: function(){
        return (
            <form id="box_form" className="box_class" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="col-xs-12 col-md-6 col-md-offset-3">
                        <div className="input-group">
                            <input type="text" className="form-control" id="address" placeholder="Enter a task..." 
                                value={this.state.value} onChange={this.handleChange} />
                            <span className="input-group-btn">
                                <span className="glyphicon glyphicon-hand-down" aria-hidden="true" onClick={this.handleSubmit}></span>
                            </span>
                        </div>
                    </div>
                </div>

            </form>
        );
    }

});

module.exports = Box;
