import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import Home from './componentes/Home';
import AutorBox from './componentes/AutorBox';

const routes = (
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/autor" component={AutorBox} />
      <Route exact path="/livros" />
    </Switch>
  </App>
);

ReactDOM.render(
  (
    <Router>
      {routes}
    </Router>
  ),
  document.getElementById('root')
);

