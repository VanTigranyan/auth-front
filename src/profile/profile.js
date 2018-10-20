import React from "react";
import NavBar from "../navbar/navbar";
import Posts from "../posts/posts";
import Settings from "../settings/settings";
import {
  withRouter,
  Link,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { reqUserAction } from "../actions/actions";

const mapStateToProps = state => {
  return {
    user: state.requestUserReducer.user,
    isPending: state.requestUserReducer.isPending,
    error: state.requestUserReducer.error
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onRequestUser: () => dispatch(reqUserAction())
  };
};

class Profile extends React.Component {
  componentWillMount() {
    this.props.onRequestUser();
  }

  logOut = () => {
    localStorage.removeItem("auth-token");
    this.props.history.push("/");
  };

  render() {
    const { user, isPending, error } = this.props;

    if (isPending === true) {
      return (
        <div id="nb-global-spinner" className="spinner">
          <div className="blob blob-0" />
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />
          <div className="blob blob-5" />
        </div>
      );
    } else if (!isPending && user) {
      return (
        <React.Fragment>
          <Router>
            <div>
              <NavBar user={this.props.user} logOut={this.logOut} />
              <Route
                path="/posts"
                render={props => <Posts user={this.props.user} {...props} />}
              />
              <Route
                path="/settings/:id"
                render={props => <Settings user={this.props.user} {...props} />}
              />
              <Route
                path="/profile"
                render={props => {
                  return (
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                          <div className="card card-signin my-5">
                            <div className="card-body">
                              <h5>Here is Your Info</h5>
                              <ul>
                                <li>Your Name: {user.firstName}</li>
                                <li>Your Last Name: {user.lastName}</li>
                                <li>Your Username: {user.username}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </Router>
        </React.Fragment>
      );
    } else if (!isPending && error) {
      return (
        <React.Fragment>
          <h3>You should log in first</h3>
          <h4>
            Go to
            <span
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => this.props.history.push("/")}
            >
              {" LOG IN "}
            </span>
            page
          </h4>
        </React.Fragment>
      );
    } else {
      return (
        <h1>
          Something went wrong!!! Go to <Link to="/login">LOGIN</Link> page!
        </h1>
      );
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchtoProps
  )(Profile)
);
