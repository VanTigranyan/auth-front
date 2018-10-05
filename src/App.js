import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Profile from './profile/profile';
import Login from './login/login';


class App extends Component {
  constructor(){
    super()
    this.state = {
      route: 'login',
      user: '',
      isLoggedIn: false,
    }
  }

getUser = (u) => {
  this.setState({
    user: {...u}
  })
}

  render() {
    return(
      <Router>
        <div>
          <Switch>
            <Route exact path="/"
              render={(props) => <Login {...props}  user={this.getUser}/>}
              />
            <Route path="/profile"
              render={(props) => <Profile {...props} user={this.state.user}/>}
              />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
