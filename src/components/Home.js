import React, { Component } from 'react';
import axios from 'axios';
const URL = "http://localhost:8000/profile";
class App extends Component {

  async componentDidMount() {

    if (localStorage.getItem('token')) {
      const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
      const { data: { user } } = await axios.get(URL, { headers: { Authorization: AuthStr } })
      user.isAdmin ? this.props.history.push('/admin', user) :
        this.props.history.push('/teacher', user)
    } else {
      this.props.history.push('/login')
    }
  }
  render() {
    return (
      <div>
        Loading...
      </div>
    );
  }
}

export default App;