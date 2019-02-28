import React from 'react';
import axios from 'axios';

import { getJwt } from '../helpers/jwt';
import {URL} from '../helpers/url';

class Admin extends React.Component {

    state = {
        user: this.props.location.state
    }

    async componentDidMount() {
        if (this.state.user && getJwt()) {
            const { user } = this.state;
            this.setState({ user });
        } else if (getJwt()) {
            const Authorization = 'Bearer '.concat(getJwt());
            const { data: { user } } = await axios.get(URL + 'profile', { headers: { Authorization } });
            user.isAdmin ? this.setState({ user }) : this.props.history.push('/');
        } else {
            this.logOut();
        }
    }


    logOut = () => {
        localStorage.removeItem('token');
        this.props.history.push('/');
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
        }
        return (
             <div>
                 Loading...
            </div>
        )
    }
}


export default Admin;