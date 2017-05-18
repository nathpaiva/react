import React, { Component } from 'react';

class ButtonCustom extends Component {

  render() {
    // console.log('this.props', this.props);
    return (
      <div className="pure-control-group">
        <input type="submit" className="pure-button pure-button-primary" value={this.props.label} />
      </div>
    )
  }
}


export default ButtonCustom;
