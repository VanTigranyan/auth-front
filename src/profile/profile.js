import React from "react";
import { withRouter } from "react-router-dom";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    fetch("http://localhost:4000/users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth-token")
      }
    })
      .then(res => res.json())
      .then(users =>
        this.setState({
          user: users[0]
        })
      );
  }

  logOut = () => {
    localStorage.removeItem("auth-token");
    this.props.history.push("/");
  }
  
  render() {
    if (this.state.user) {
      return (
        <React.Fragment>
          <div>
            <h1>{`Good day dear ${this.state.user.firstName}`}</h1>
          </div>
          <div>
            <h4>
              You can{" "}
              <span onClick={this.logOut} style={{ cursor: "pointer", color: 'blue'}}>
                LOG OUT
              </span>
            </h4>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h3>You should log in first</h3>
          <h4>
            Go to
            <span
              style={{ cursor: "pointer", color: 'red' }}
              onClick={() => this.props.history.push("/")}
            >
            {' LOG IN '}
            </span>
             page
          </h4>
        </React.Fragment>
      );
    }
  }
}

export default withRouter(Profile);
