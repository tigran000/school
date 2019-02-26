import React from 'react';
import axios from 'axios';
const URL = "http://localhost:8000/profile";

class Admin extends React.Component {

    state = {
        user: undefined
    }

    async componentDidMount() {
        console.log(this.props.location.state)
        if (!this.props.location.state) {
            console.log('no request')
            if (localStorage.getItem('token')) {
                const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
                const { data: { user } } = await axios.get(URL, { headers: { Authorization: AuthStr } })
                console.log(user)
                if (user.isAdmin) {
                    this.setState({ user })
                } else {
                    this.props.history.push('/login')
                }

            }
        } else {
            this.setState({
                user: this.props.location.state
            })
        }
    }

    logOut = () => {
        this.props.history.push('/login')
        localStorage.removeItem('token');
    }
    render() {
        console.log(this.props)
        if (this.state.user) {
            return (
                <div>
                    You are Admin
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