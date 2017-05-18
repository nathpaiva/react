import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class InputCustomizado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgError: ''
    }
  }

  componentDidMount() {
    PubSub.subscribe("error-validation", (topic, err) => {
      if (err.field === this.props.name) {
        this.setState({ msgError: err.defaultMessage });
      }
    });

    PubSub.subscribe("clean-errors", topic => this.setState({ msgError: '' }));
  }

  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
        <span className="erro">{this.state.msgError}</span>
      </div>
    )
  }
}

export default InputCustomizado;
