import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
<<<<<<< HEAD
import NavBar from './NavBar.jsx';
=======
import LinkedinLogin from './LinkedInLogin.jsx';
import cookie from 'react-cookie';
>>>>>>> 7dffde6e2f32e946a131b758d32f250d67563e7c

let socket = io.connect();

class App extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
    this.state = {type: "login",
          data: {},
        userId: cookie.load('userId'),
        name: cookie.load('name')}
  }

  componentDidMount() {
    const app = this;
    socket.on('connect', function(data) {});
  }
  callbackFunction() {
    let app = this;
    function onSuccess(data) {
      socket.emit('user', data)
      cookie.save('userId', data.id, { path: '/' });
      cookie.save('name', data.firstName, { path: '/' });
      app.setState({
        userId: data.id,
        name: data.firstName});
    }

    function onError(error) {
    }

    IN.API.Raw("/people/~:(id,first-name,last-name,location,positions,industry,specialties,summary)?format=json").result(onSuccess).error(onError);
  }

  onLogout() {
    cookie.remove('userId', { path: '/' });
    cookie.remove('name', { path: '/' });
    this.setState({
        userId: null,
        name: null});
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
    if (!this.state.userId) {
      return <LinkedinLogin callbackFunction={this.callbackFunction}/>;
    }
    return (
      <div>
<<<<<<< HEAD
        <NavBar />
        <h1>Hello, {this.props.name} {this.state.test}!</h1>
        <input onKeyPress={this.submit} placeholder={this.state.test} />
=======
        <h1>Hello, {this.state.name}!</h1>
        <button onClick={this.onLogout}> Log Out</button>
>>>>>>> 7dffde6e2f32e946a131b758d32f250d67563e7c
      </div>
    )
  }
};

export default App;
