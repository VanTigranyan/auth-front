import React, { Component } from "react";
import Settings from './settings/settings';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
import Profile from "./profile/profile";
import Register from "./register/register";
import Login from "./login/login";
import Posts from "./posts/posts.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "login",
      user: "",
      isLoggedIn: false
    };
  }

  getUser = u => {
    this.setState({
      user: { ...u }
    });
  };

  render() {
    return (
      <Router>
        <LastLocationProvider>
          <div>
            <Switch>
              <Redirect exact from="/" to="/login" />
              <Route
                path="/login"
                render={props => <Login {...props} user={this.getUser} />}
              />
              <Route
                path="/profile"
                render={props => <Profile {...props} user={this.state.user} />}
              />
              <Route
                path="/register"
                render={props => <Register {...props} />}
              />
              <Route
                path='/settings/:id'
                render={( props ) => <Settings  user={ this.state.user } {...props} /> }
              />
              <Route
                path='/posts'
                render={( props ) => <Posts  user={ this.state.user } {...props} /> }
              />
            </Switch>
          </div>
        </LastLocationProvider>
      </Router>
    );
  }
}

export default App;
