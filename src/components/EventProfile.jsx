import React, { Component } from 'react';

class EventProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }


   render() {
    let dateStart = new Date(this.props.data.event.start_time)
    let dateEnd = new Date(this.props.data.event.end_time)
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <button onClick={this.props.onLogout}> Log Out</button>
        <h3>{this.props.data.event.name}</h3>
        <h3>{this.props.data.event.venue}</h3>
        <h3>{dateStart.toString()}</h3>
        <h3>{dateEnd.toString()}</h3>
        {this.props.data.users.map((dat, i) => {
            return <h3 key={i} onClick={this.props.seeProfile.bind(null, dat)}>{dat.first_name}</h3>
        })}
        <button onClick={this.props.backToMain}> Back</button>
      </div>
    )
  }
};

export default EventProfile;