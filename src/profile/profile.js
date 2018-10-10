import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { reqUserAction } from '../actions/actions';

const mapStateToProps = state => {
  return {
    user: state.requestUserReducer.user,
    isPending: state.requestUserReducer.isPending,
    error: state.requestUserReducer.error
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    onRequestUser: () => dispatch(reqUserAction()),
  }
}

class Profile extends React.Component {

  componentWillMount() {
    this.props.onRequestUser();
  }

  logOut = () => {
    localStorage.removeItem("auth-token");
    this.props.history.push("/");
  }

  render() {
    const { user, isPending, error } = this.props;

    if(isPending === true) {
      return (
        <div id="nb-global-spinner" className="spinner">
        <div className="blob blob-0"></div>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="blob blob-5"></div>
      </div>
      )
    } else if (!isPending && user) {
      return (
        <React.Fragment>
          <div>
            <h1>{`Good day dear ${user.firstName}`}</h1>
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
    } else if(!isPending && error) {
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
    } else {
      return <h1>Something went wrong!!! Go to <Link to="/login">LOGIN</Link> page!</h1>
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Profile));
