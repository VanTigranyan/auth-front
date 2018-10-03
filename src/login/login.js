import React from "react";

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

  requestLogin() {
    const { username, password } = this.state;
    fetch("http://localhost:5000/authenticate", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(token => {
        localStorage.setItem('auth-token', token);
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
                  <button className="ui primary labeled icon button" onClick={this.requestLogin}>
                    <i className="unlock alternate icon" />
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
