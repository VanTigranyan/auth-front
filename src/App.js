import React, { Component } from 'react';
import Profile from './profile/profile';
import Login from './login/login';


class App extends Component {
  constructor(){
    super()
    this.state = {
      route: 'login',
      user: ''
    }
  }

changeRoute = () => {
  this.setState({
    route:'home'
  })
}

  render() {
      return this.state.route === 'login'? <Login onRouteChange={this.changeRoute} /> : <Profile user={this.state.user}/>
  }
}

export default App;
