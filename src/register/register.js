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

  requestRegister = (e) => {
    e.preventDefault();

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
            <div className="card card-signin my-5">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card-body">
                  <h5 className="card-title text-center">Register</h5>
                  <div
                    className="alert alert-danger"
                    style={this.state.displayToaster}
                  >
                    <div className='alert-heading'>Register failed!</div>
                    <hr/>
                    <p>Username already is taken or some field are empty!</p>
                  </div>
                  <form className="form-signin" method="post" onSubmit={(event) => this.requestRegister(event)}>
                    <div className="form-label-group">
                      <input type="text" id="username"
                        className="form-control"
                        placeholder="Username"
                        required autoFocus name='username'
                        onChange={event => this.onFieldChange(event)}
                      />
                      <label htmlFor="username">Username</label>
                    </div>

                    <div className="form-label-group">
                      <input type="password" id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required name='password'
                        onChange={event => this.onFieldChange(event)}
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>

                    <div className="form-label-group">
                      <input type="text" id="firstName"
                        className="form-control"
                        placeholder="First Name"
                        required autoFocus name='firstName'
                        onChange={event => this.onFieldChange(event)}
                      />
                      <label htmlFor="firstName">First Name</label>
                    </div>

                    <div className="form-label-group">
                      <input type="text" id="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required autoFocus name='lastName'
                        onChange={event => this.onFieldChange(event)}
                      />
                      <label htmlFor="lastName">Last Name</label>
                    </div>
                    <h6>Already have an account? <Link to='/login'>LOG IN</Link></h6>
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                  </form>
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
