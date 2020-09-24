import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/home/Home';
import Test1 from './pages/test1/Test1';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/test1" exact component={Test1} />
      </Switch>
    </Router>
  );
}

export default App;
