import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MainSection from './MainSection.jsx';
import UserProfile from './UserProfile.jsx';
import LinkedinLogin from './LinkedInLogin.jsx';
import EventProfile from './EventProfile.jsx';
import Event from './Event.jsx';
import cookie from 'react-cookie';
import EventsCreation from './EventsCreation.jsx';


let socket = io.connect();

class App extends Component {
  constructor(props) {
    super(props);

    let type = 'login';
    let data = {};
    if (cookie.load('userId')){
      let data2 = {
        userId: cookie.load('userId'),
      }
      socket.emit('userLogin', data2)
    }
    this.seeProfile = this.seeProfile.bind(this);
    this.backToEP = this.backToEP.bind(this);
    this.backToMain = this.backToMain.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.eventPage = this.eventPage.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
    this.eventsCreation = this.eventsCreation.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.state = {type: type,
        userId: cookie.load('userId'),
        name: cookie.load('name')}
  }

  componentDidMount() {
    const app = this;
    socket.on('connect', function(data) {

    });
    socket.on('responseUserLogin', function(data) {
      app.setState({
        type: 'events',
        data: {
          myEvent: data.userEvent,
          allEvent: data.allEvents
        }});
    });
    socket.on('eventAdded', function(data) {
      let data2 = {
        userId: cookie.load('userId'),
      }
      socket.emit('userLogin', data2)
    });
  }

  callbackFunction() {
    let app = this;
    function onSuccess(data) {
      let data2 = {
        userId: data.id,
      }
      socket.emit('userLogin', data2)
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

  addEvent(event){
    let data = {
      userId: cookie.load('userId'),
      eventId: event
    }
    socket.emit("addEvent", data)
  }

  handleForm(formInput) {
    let contentToServer = {
      formInput:formInput
        }
    let data2 = {
        userId: cookie.load('userId'),
        }
    socket.emit('createEvent', contentToServer)
    socket.emit('userLogin', data2)
    console.log("This is the content", formInput)
  }


  eventPage(event){
    this.setState({
      type: 'event',
      data: {
          name: event,
          timeStart: 'April 6th 2016, 6:30 PM',
          timeEnd: 'April 6th 2016, 7:30 PM',
          people:['John', 'Jack', 'Joe', 'Jill', 'J.J.']
        }
    });
  }

  eventsCreation(){
    this.setState({
      type: 'creation'
    });
  }

  backToMain(){
    let data2 = {
        userId: cookie.load('userId'),
    }
    socket.emit('userLogin', data2)
  }

  seeProfile() {
    this.setState({
      type: 'userProfile',
      data: {
          name: 'Davie',
          company: 'Lighthouse',
          summary: 'I code stuff',
        }
    });
  }


  backToEP(){
    this.setState({
      type: 'event',
      data: {
          name: "sdsadas",
          timeStart: 'April 6th 2016, 6:30 PM',
          timeEnd: 'April 6th 2016, 7:30 PM',
          people:['John', 'Jack', 'Joe', 'Jill', 'J.J.']
        }
    });
  }

  onLogout() {
    cookie.remove('userId', { path: '/' });
    cookie.remove('name', { path: '/' });
    this.setState({
        type: 'login',
        data: {},
        userId: null,
        name: null});
  }

  render() {

    if (!this.state.userId) {
      return (
      <div>
        <NavBar eventsCreationFunction={this.eventsCreation}/>
        <MainSection callbackFunction={this.callbackFunction}/>
      </div>
    )}

    if (this.state.type === "events"){
       return <Event name={this.state.name} eventsCreation={this.eventsCreation} eventPage={this.eventPage} addEvent={this.addEvent} data={this.state.data} onLogout={this.onLogout}/>
    }
    if (this.state.type === "creation") {
       return <EventsCreation  handleForm={this.handleForm}/>
    }
    if (this.state.type === "event"){
       return <EventProfile name={this.state.name} seeProfile={this.seeProfile} backToMain={this.backToMain} data={this.state.data} onLogout={this.onLogout}/>
    }
    if (this.state.type === "userProfile"){
       return <UserProfile name={this.state.name} backToEP={this.backToEP} data={this.state.data} onLogout={this.onLogout}/>
    }
    return (
      <h1>ERROR</h1>
    )
  }
};

export default App;
