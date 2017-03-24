import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import NavBar from './NavBar.jsx';

let socket = io.connect();

class App extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {test: "hello"}
  }

  componentDidMount() {
    socket.on('connect', function(data) {
      socket.emit('join', 'hello world from the client!');
    });
  }

  submit(key) {
    if (key.charCode === 13) {
      const newMessage = key.target.value;
      key.target.value = '';
      console.log(this.state.test)
      this.setState({test: "newMessage" })
            console.log(this.state.test)

    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <h1>Hello, {this.props.name} {this.state.test}!</h1>
        <input onKeyPress={this.submit} placeholder={this.state.test} />
      </div>
    )
  }
};

export default App;
