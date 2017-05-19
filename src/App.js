import React, { Component } from 'react';

import '../css/pure.min.css';
import '../css/slide-menu.css';

import Menu from './componentes/Menu';

class App extends Component {
  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>
            <Menu label='Home' pathMenu='/' />
            <Menu label='Autor' pathMenu='/autor' />
            <Menu label='Livros' pathMenu='/livros' />
          </div>
        </div>

        {this.props.children}
      </div>
    );
  }
}

export default App;
