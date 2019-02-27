import React from 'react';
import axios from 'axios';
const URL = "http://localhost:8000/profile";

class Admin extends React.Component {

    state = {
        user: undefined
    }

    async componentDidMount() {
        if (this.props.location.state && localStorage.getItem('token')) {
            this.setState({
                user: this.props.location.state
            })
        } else if (localStorage.getItem('token')) {
            const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
            const { data: { user } } = await axios.get(URL, { headers: { Authorization: AuthStr } })
            user.isAdmin ? this.setState({ user }) : this.props.history.push('/')
        } else {
            this.logOut()
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
                    You are Admin put components
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


export default Admin;