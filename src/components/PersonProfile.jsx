import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }


  render() {
    return (
      <div>
        <h1>This is from UserProfile</h1>
        {/*<h1>Hello, {this.props.name}!</h1>
        <button onClick={this.props.onLogout}> Log Out</button>
        <h3>{this.props.data.name}</h3>
        <h3>{this.props.data.company}</h3>
        <h3>{this.props.data.summary}</h3>
        <button onClick={this.props.backToEP}> Back</button>*/}
      </div>
    )
  }
};

export default UserProfile;