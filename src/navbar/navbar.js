import React from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <a className="navbar-brand" href="#">
            Auth App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <h4 onClick={this.props.history.goBack()}> &larr; Go Back</h4>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/posts"}>
                  Posts
                </Link>
              </li>
              <li className="nav-item dropdown mr-5">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  User
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {this.props.location.pathname !==
                    "/settings" + this.props.user.id ? (
                      <React.Fragment>
                        <Link
                          to={"/settings/" + this.props.user.id}
                          className="dropdown-item"
                        >
                          Edit Profile
                        </Link>
                        <div className="dropdown-divider" />
                      </React.Fragment>
                    ) : null}

                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={event => {
                      event.preventDefault();
                      this.props.logOut();
                    }}
                  >
                    Log Out
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
export default withRouter(NavBar);
