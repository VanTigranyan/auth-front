import React from "react";
import axiosInst from '../_helpers/axios-helper'
import { withRouter, Link } from 'react-router-dom';

import { USER_REGISTER } from '../_helpers/api';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      firstName:"",
      lastName:"",
      displayToaster: {
        display: "none"
      }
    };
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  requestRegister = () => {
    axiosInst({
      method: "post",
      url: USER_REGISTER,
      data: {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      }
    })
      .then(user => {
        this.props.history.push('/login');
      })
      .catch(err => {
        this.setState({displayToaster:{display: 'block'}})
      })
  }

  render() {
    return (
      <div className="page-login">
        <div className="ui centered grid container">
          <div className="nine wide column">
            <div
              className="ui icon warning message"
              style={this.state.displayToaster}
            >
              <i className="lock icon" />
              <div className="content">
                <div className="header">Register failed!</div>
                <p>Username already is taken or some field are empty!</p>
              </div>
            </div>
            <div className="ui fluid card">
              <div className="content">
                <div className="ui form">
                  <div className="field">
                    <label>User</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="User"
                      onChange={event => this.onFieldChange(event)}
                    />
                  </div>
                  <div className="field">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      onChange={event => this.onFieldChange(event)}
                    />
                  </div>
                  <div className="field">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={event => this.onFieldChange(event)}
                    />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={event => this.onFieldChange(event)}
                    />
                  </div>
                  <button className="ui primary labeled icon button" onClick={this.requestRegister}>
                    <i className="unlock alternate icon" />
                    Register
                  </button>
                  <div>
                    <h5>Already have an account? <Link to='/'>Login</Link></h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Register);
