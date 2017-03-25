import React, { Component } from 'react';

class EventProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }


  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <button onClick={this.props.onLogout}> Log Out</button>
        <h3>{this.props.data.name}</h3>
        <h3>{this.props.data.timeStart}</h3>
        <h3>{this.props.data.timeEnd}</h3>
        <h3 onClick={this.props.seeProfile}>{this.props.data.people[1]}</h3>
        <button onClick={this.props.backToMain}> Back</button>
      </div>
    )
  }
};

export default EventProfile;