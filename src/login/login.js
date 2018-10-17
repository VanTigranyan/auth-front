import React from "react";
import axios from "axios";
import './login.css';
import { withRouter, Link } from "react-router-dom";

import { USER_AUTHENTICATE } from "../_helpers/api";

axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "auth-token"
);

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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

  requestLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: USER_AUTHENTICATE,
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
      .then(user => {
        localStorage.setItem("auth-token", user.data.token);
        this.props.user(user.data);
        this.props.history.push("/profile");
      })
      .catch(err => {
        this.setState({ displayToaster: { display: "block" } });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin" onSubmit={event => this.requestLogin(event)}>
                  <div className="form-label-group">
                    <input type="text" id="username"
                      className="form-control"
                      placeholder="Email address"
                      required autofocus name='username'
                      onChange={event => this.onFieldChange(event)}
                    />
                    <label htmlFor="username">Email address</label>
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
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
