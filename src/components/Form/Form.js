import React from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import {
  Form, Icon, Input, Button
} from 'antd';
import './Form.css';
const URL = "http://localhost:8000/"



class NormalLoginForm extends React.Component {

  state = {
    laoding: true
  }

  async componentDidMount() {

    if (localStorage.getItem('token')) {
      const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
      const { data: { user } } = await axios.get(URL + "profile", { headers: { Authorization: AuthStr } })
      user.isAdmin ? this.props.history.push('/admin', user) :
        this.props.history.push('/teacher', user)
    } else {
      this.setState({ laoding: false })
    }

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, credentials) => {
      if (!err) {
        const { data: { token, user } } = await axios.post(URL + "login", { credentials })
        if (user) {

          localStorage.setItem('token', token)

          user.isAdmin ? this.props.history.push('/admin', user) :
            this.props.history.push('/teacher', user)
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Wrong credentials',
            type: 'error',
            confirmButtonText: 'Okay'
          })
          this.props.form.resetFields()
        }
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.state.laoding) {
      return (
        <div>
          Loading...555
        </div>
      )
    }

    return (
      <Form onSubmit={this.handleSubmit} className="login-form" >
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default LoginForm;