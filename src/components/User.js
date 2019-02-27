import React from 'react';
import axios from 'axios';
const URL = "http://localhost:8000/profile";

class User extends React.Component {

    state = {
        user: undefined
    }

    async componentDidMount() {
        console.log(this.props.location.state)
        if (!this.props.location.state) {  // ete state unes el petq chi
            if (localStorage.getItem('token')) {
                const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
                const { data: { user } } = await axios.get(URL, { headers: { Authorization: AuthStr } })
                console.log(user)
                if (user.isAdmin) {
                    this.props.history.push('/login')
                } else {
                    this.setState({ user })
                }
            } else {
                this.props.history.push('/login')
            }
        } else if (!this.props.location.state.isAdmin && localStorage.getItem('token')) {
            this.setState({
                user: this.props.location.state
            })
        } else {
            this.props.history.push('/login')
        }


    }

    logOut = () => {
        this.props.history.push('/login')
        localStorage.removeItem('token');
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