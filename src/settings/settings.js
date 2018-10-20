import React from "react";
import axiosInst from "../_helpers/axios-helper";

import {USER_UPDATE} from '../_helpers/api';


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false,
      changedFields: [],
    };
  }

  componentDidMount() {
    document.getElementById('username').value = this.props.user.username;
    document.getElementById('firstName').value = this.props.user.firstName;
    document.getElementById('lastName').value = this.props.user.lastName;

  }


  onFieldChange(event) {
    event.target.value = event.target.value

    this.setState({
      [event.target.name]: event.target.value,
      changed: true
    });

    if(event.target.name === 'password' && this.state.changedFields.indexOf('password')===-1) {

      this.setState({
        changedFields: [...this.state.changedFields, 'password']
      })

    } else {

      if(this.state.changedFields.indexOf(event.target.name)===-1) {

        this.setState({
          changedFields: [...this.state.changedFields, event.target.name]
        })

      }
    }
  }

  requestUpdate = (event) => {
    event.preventDefault();
    const { match: { params } } = this.props;
    const id = params.id;

    let reqObj = {};

    this.state.changedFields.map(str => {
      reqObj[str] = this.state[str]
    })

    console.log(reqObj)

    axiosInst({
      method: 'put',
      url: USER_UPDATE +'/'+ id,
      data : reqObj
    })
    .then(response => {
      console.log(response.data);
      this.props.reqUser();
      this.props.history.push('/profile')
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div style={{ paddingTop: "60px" }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Edit Profile</h5>
                  <form className="form-signin" onSubmit={event => this.requestUpdate(event)}>
                    <div className="form-label-group">
                      <input type="text" id="username"
                        className="form-control"
                        placeholder="Username"
                        required autoFocus name='username'
                        onChange={event => this.onFieldChange(event)}
                      />
                      <label htmlFor="username">Username</label>
                    </div>

                    <div className="form-label-group">
                      <input type="password" id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required name='password'
                        onChange={event => this.onFieldChange(event)}
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>

                    <div className="form-label-group">
                      <input type="text" id="firstName"
                        className="form-control"
                        placeholder="First Name"
                        required name='firstName'
                        onChange={event => this.onFieldChange(event)}
                      />
                      <label htmlFor="firstName">First Name</label>
                    </div>

                    <div className="form-label-group">
                      <input type="text" id="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        required name='lastName'
                        onChange={event => this.onFieldChange(event)}
                      />
                      <label htmlFor="lastName">Last Name</label>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Update Info</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
