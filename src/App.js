import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Form from './components/Form';
import Admin from './components/Admin';
import User from './components/User';
import Home from './components/Home';
class App extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Form} />
        <Route exact path="/teacher" component={User} />
        <Route exact path="/admin" component={Admin} />
      </>
    )
  }
}

export default App;