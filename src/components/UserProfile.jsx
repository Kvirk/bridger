import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
  }

  submit(key) {
    if (key.charCode === 13) {
      const newMessage = key.target.value;
      key.target.value = '';
      return this.props.sendMessage(newMessage);
    }
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <button onClick={this.props.onLogout}> Log Out</button>
        <h3>{this.props.data.first_name}</h3>
        <h3>{this.props.data.last_name}</h3>
        <h3>{this.props.data.headline}</h3>
        <h3>{this.props.data.company}</h3>
        <h3>{this.props.data.industry}</h3>
        <h3>{this.props.data.location}</h3>
        <button onClick={this.props.backToEP.bind(null, this.props.data.event_id)}> Back</button>

         <input onKeyPress={this.submit} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </div>
    )
  }
};

export default UserProfile;
