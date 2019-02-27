import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Form from './components/Form';
import Admin from './components/Admin';
import User from './components/User';
class App extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={Form} />
        <Route exact path="/teacher" component={User} />
        <Route exact path="/admin" component={Admin} />
      </>
    )
  }
}

export default App;