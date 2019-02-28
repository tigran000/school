import React from 'react';
import axios from 'axios';
const URL = "http://localhost:8000/";

class User extends React.Component {

    state = {
        user: this.props.location.state
    }

    async componentDidMount() {
        if (this.state.user && localStorage.getItem('token')) {
            const { user } = this.state
            this.setState({ user })
        } else if (localStorage.getItem('token')) {
            const Authorization = 'Bearer '.concat(localStorage.getItem('token'));
            const { data: { user } } = await axios.get(URL + 'profile', { headers: { Authorization } })
            user.isAdmin ? this.props.history.push('/') : this.setState({ user })
        } else {
            this.props.history.push('/')
        }
    }

    logOut = () => {
        localStorage.removeItem('token');
        this.props.history.push('/')
    }

    render() {
        if (this.state.user) {
            return (
                <div>
                    You are User
                    <h1> {this.state.user.userName} </h1>
                    <button onClick={this.logOut}> Log out </button>
                </div>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }
}


export default User;