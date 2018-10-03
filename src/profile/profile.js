import React from 'react';


class Profile extends React.Component {
  render() {
    return (
      <div>
        <h1>{`Good day dear ${this.props.username}`}</h1>
      </div>
    )
  }
}

export default Profile
