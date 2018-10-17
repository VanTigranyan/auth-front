import React from "react";
import { Tab } from "semantic-ui-react";
import axiosInst from "../_helpers/axios-helper";


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  requestUpdate = (event) => {
    const { displayToaster, ...info } = this.state;
    const { password, firstName, lastName, username } = info;

    const { match: { params } } = this.props;
    const id = params.id;

    axiosInst({
      method: 'put',
      url: '/' + id,
      data :{
        ...info
      }
    })
    .then(response => {
      console.log(response.data);
      if(this.state.password) {
        this.props.history.push('/login')
      }
      this.props.history.push('/profile')
    })
    .catch(error => console.log(error))
  }

  render() {

    const panes = [
      {
        menuItem: "Change Username",
        render: () => {
          return (
          <Tab.Pane>
            <h3>Change Username</h3>
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
                    <div className="helper_message"><h5>This username have already taken, please try another!</h5></div>
                  </div>

                  <button className="ui primary labeled icon button" onClick={(event) => this.requestUpdate(event)}>
                    <i className="refresh alternate icon" />
                    Update
                  </button>
                </div>
              </div>
            </div>
    </Tab.Pane>
        )}
      },
      {
        menuItem: "Change First Name",
        render: () => {
          return (
          <Tab.Pane>
            <h3>Change First Name</h3>
            <div className="ui fluid card">
              <div className="content">
                <div className="ui form">
                  <div className="field">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      onChange={event => this.onFieldChange(event)}
                    />
                    <div className="helper_message"><h5>Something went wrong, please try again!</h5></div>
                  </div>

                  <button className="ui primary labeled icon button" onClick={(event) => this.requestUpdate(event)}>
                    <i className="refresh alternate icon" />
                    Update
                  </button>
                </div>
              </div>
            </div>
    </Tab.Pane>
        )}
      },
      {
        menuItem: "Change Last Name",
        render: () => {
          return (
          <Tab.Pane>
            <h3>Change Last Name</h3>
            <div className="ui fluid card">
              <div className="content">
                <div className="ui form">
                  <div className="field">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={event => this.onFieldChange(event)}
                    />
                    <div className="helper_message"><h5>Something went wrong, Please try again!</h5></div>
                  </div>
                  <button className="ui primary labeled icon button" onClick={(event) => this.requestUpdate(event)}>
                    <i className="refresh alternate icon" />
                    Update
                  </button>
                </div>
              </div>
            </div>
    </Tab.Pane>
        )}
      },
      {
        menuItem: "Change Password",
        render: () => {
          return (
          <Tab.Pane>
            <h3>Change Password</h3>
            <div className="ui fluid card">
              <div className="content">
                <div className="ui form">
                  <div className="field">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={event => this.onFieldChange(event)}
                    />
                  </div>
                  <div className="helper_message"><h5>This password is incorrect, please try another!</h5></div>
                  <button className="ui primary labeled icon button" onClick={(event) => this.requestUpdate(event)}>
                    <i className="refresh alternate icon" />
                    Update
                  </button>
                </div>
              </div>
            </div>
    </Tab.Pane>
        )}
      }
    ];


    return (
      <div style={{ paddingTop: "60px" }}>
        <Tab
          menu={{ fluid: true, vertical: true }}
          menuPosition="left"
          panes={panes}
        />
      </div>
    );
  }
}
