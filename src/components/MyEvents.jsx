import React, { Component } from 'react';

class MyEvents extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <h1>This is MyEvents Component</h1>
        <h1><a href="#eventprofile" onClick={this.goToEventProfile}>My Event 1</a></h1>
        <h1><a href="#eventprofile" onClick={this.goToEventProfile}>My Event 2</a></h1>
        <h1><a href="#eventprofile" onClick={this.goToEventProfile}>My Event 3</a></h1>
        <hr />
        {/*<h1>Hello, {this.props.name}!</h1>
          {this.props.data.myEvent.map((dat, i) => {
            return <button key={i} onClick={this.props.eventPage.bind(null, dat)}>{dat}</button>
          })}
          <button onClick={this.props.onLogout}> Log Out</button>
          <div>
            {this.props.data.allEvent.map((dat, i) => {
            return <button key={i*3} onClick={this.props.addEvent.bind(null, dat)}>{dat}</button>
          })}
          </div>*/}
      </div>
    )
  }
};

export default MyEvents;