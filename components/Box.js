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

      //Prevent default
      event.preventDefault();

      //Store value
      var value = this.state.value;
      this.props.storeTask(value);
      console.log("added:" + value);

      React.findDOMNode(this.refs.boxref).blur();
    },
    onBlur: function(event){
      console.log("blur");
      this.state.value = "";
    },
    render: function(){
        return (
            <form id="box_form" className="box_class" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="col-xs-12 col-md-6 col-md-offset-3">
                        <div className="input-group">
                            <input ref="boxref" type="text" className="form-control" id="address" placeholder="What's on your mind...?"
                                value={this.state.value} onChange={this.handleChange} onBlur={this.onBlur}/>
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
