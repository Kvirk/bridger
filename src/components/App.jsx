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
      type = 'events';
      data = {
          myEvent:['a','b', 'c'],
          allEvent: ['d', 'e' ]
        };
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
        data: data,
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
        type: 'events',
        data: {
          myEvent:['a','b', 'c'],
          allEvent: ['d', 'e' ]
        },
        userId: data.id,
        name: data.firstName});
    }

    function onError(error) {
    }

    IN.API.Raw("/people/~:(id,first-name,last-name,headline,location,industry,current-share,num-connections,summary,positions,picture-urls::(original),public-profile-url)?format=json").result(onSuccess).error(onError);
  }

  addEvent(event){
    let myEvent = this.state.data.myEvent;
    let allEvent = this.state.data.allEvent;
    myEvent.push(event);

    let index = allEvent.indexOf(event);

    if (index > -1) {
      allEvent.splice(index, 1);
    }

    this.setState({data: {
          myEvent,
          allEvent
        }});
  }

  handleForm(formInput) {
    let contentToServer = {
      formInput:formInput
    }
    socket.emit('createEvent', contentToServer)
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
    this.setState({
        type: 'events',
        data: {
          myEvent:['a','b', 'c'],
          allEvent: ['d', 'e' ]
        }});
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

    if (this.state.type === "creation") {
       return <EventsCreation  handleForm={this.handleForm}/>
    }

    if (!this.state.userId) {
      return (
      <div>
        <NavBar eventsCreationFunction={this.eventsCreation}/>
        <MainSection callbackFunction={this.callbackFunction}/>
      </div>
    )}

    if (this.state.type === "events"){
       return <Event name={this.state.name} eventPage={this.eventPage} addEvent={this.addEvent} data={this.state.data} onLogout={this.onLogout}/>
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
