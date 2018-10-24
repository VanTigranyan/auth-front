import React, { Component } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import {LastLocationProvider} from 'react-router-last-location';
import Profile from "./profile/profile";
import Register from "./register/register";
import Login from "./login/login";

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route
              path="/login"
              render={props => <Login {...props}  />}
            />
            <Route
              path="/profile"
              render={props => <Profile {...props} />}
            />
            <Route
              path="/register"
              render={props => <Register {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
