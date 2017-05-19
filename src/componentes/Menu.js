import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <Link to={this.props.pathMenu} className="pure-menu-link">{this.props.label}</Link>
        </li>
      </ul>
    );
  }
}

export default Menu;
