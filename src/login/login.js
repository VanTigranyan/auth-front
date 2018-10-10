import React from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { withLastLocation } from "react-router-last-location";

axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth-token');

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

  requestLogin = () => {
    axios({
      method: 'post',
      url: "/authenticate",
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
                <div className="header">Login failed!</div>
                <p>You might have misspelled your username or password!</p>
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
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={event => this.onFieldChange(event)}
                    />
                  </div>
                  <button
                    className="ui primary labeled icon button"
                    onClick={this.requestLogin}
                  >
                    <i className="unlock alternate icon" />
                    Login
                  </button>
                  <div>
                    <h5>
                      Still dont have an account?{" "}
                      <Link to="/register">REGISTER</Link>
                    </h5>
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
export default withRouter(withLastLocation(Login));
