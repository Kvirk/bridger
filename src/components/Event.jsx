import React, { Component } from 'react';

class Event extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.data)
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
          {this.props.data.myEvent.map((dat, i) => {
            return <button key={i} onClick={this.props.eventPage.bind(null, dat)}>{dat}</button>
          })}
          <button onClick={this.props.onLogout}> Log Out</button>
          <div>
            {this.props.data.allEvent.map((dat, i) => {
            return <button key={i*3} onClick={this.props.addEvent.bind(null, dat)}>{dat}</button>
          })}
          </div>
      </div>
    )
  }
};

export default Event;