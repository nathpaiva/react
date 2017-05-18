import React, { Component } from 'react';

class InputCustomizado extends Component {
  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.nome} onChange={this.props.changeInput} />
      </div>
    )
  }
}

export default InputCustomizado;
