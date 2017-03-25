import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import LinkedinLogin from './LinkedInLogin.jsx';
import cookie from 'react-cookie';

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

    IN.API.Raw("/people/~:(id,first-name,last-name,headline,location,industry,current-share,num-connections,summary,positions,picture-urls::(original),public-profile-url)?format=json").result(onSuccess).error(onError);
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
        <h1>Hello, {this.state.name}!</h1>
        <button onClick={this.onLogout}> Log Out</button>
      </div>
    )
  }
};

export default App;
