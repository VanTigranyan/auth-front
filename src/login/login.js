import React from "react";
import axios from "axios";
import './login.css';
import { withRouter, Link, BrowserRouter as Router, Redirect } from "react-router-dom";

import { USER_AUTHENTICATE } from "../_helpers/api";

axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "auth-token"
);

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
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

  componentWillMount() {
    if(localStorage.getItem('auth-token')) {
      this.props.history.push('/profile');
    }
  }



  requestLogin = (e) => {
    const { history } = this.props;
    const path = '/profile';
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
        localStorage.setItem("auth-token", user.data['token']);
        this.setState({
          isLoggedIn: true
        })
        this.props.user(user.data);
        window.location.reload();
      })
      .catch(err => {
        this.setState({ displayToaster: { display: "block" } });
      });
  };

  render() {
    return (
      <Router>
        <div>
          {
            this.state.isLoggedIn?
              <Redirect to='/profile' />
            : (
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
                          <h6>Don't have an account? <Link to='/register'>Register</Link></h6>
                          <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </Router>
    );
  }
}
export default withRouter(Login);
