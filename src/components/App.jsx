import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import LinkedinLogin from './LinkedInLogin.jsx';

let socket = io.connect();

class App extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
    this.state = {test: "hello"}
  }

  componentDidMount() {
    const app = this;
    socket.on('connect', function(data) {
      socket.emit('join', 'hello world from the client!');
      socket.on("message", function(data){
        app.setState({test: data })
      });
    });
  }

  callbackFunction() {
    function onSuccess(data) {
      socket.emit('user', data)
    }

    function onError(error) {
        console.log(error);
    }

    IN.API.Raw("/people/~:(id,first-name,last-name,location,positions,industry,specialties,summary)?format=json").result(onSuccess).error(onError);
  }

  submit(key) {
    socket.emit('type', 'thiu');
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
        <h1>Hello, {this.props.name} {this.state.test}!</h1>
        <LinkedinLogin callbackFunction={this.callbackFunction}/>
        <input onKeyPress={this.submit} placeholder={this.state.test} />
      </div>
    )
  }
};

export default App;
