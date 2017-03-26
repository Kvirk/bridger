import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import LinkedinLogin from './LinkedInLogin.jsx';
import cookie from 'react-cookie';

import Welcome from './Welcome.jsx';
import AllEvents from './AllEvents.jsx';
import MyEvents from './MyEvents.jsx';
import EventProfile from './EventProfile.jsx';
import AllPeople from './AllPeople.jsx';
import PersonProfile from './PersonProfile.jsx';
import Schedule from './Schedule.jsx';

// import UserProfile from './UserProfile.jsx';
// import EventProfile from './EventProfile.jsx';
// import Event from './Event.jsx';


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
    // this.callbackFunction = this.callbackFunction.bind(this);
    
    this.goToEventProfile = this.goToEventProfile.bind(this);
    this.goHome= this.goHome.bind(this);
    this.onLogin = this.onLogin.bind(this);

    this.state = {type: type,
        data: data,
        userId: cookie.load('userId'),
        name: cookie.load('name')
      }
  }

  componentDidMount() {
    const app = this;
    socket.on('connect', function(data) {});
    
    // LinkedIn Login
    let liRoot = document.createElement('div');
      liRoot.id = 'linkedin-root';

      document.body.appendChild(liRoot);

      (function(d, s, id) {
        const element = d.getElementsByTagName(s)[0];
        const ljs = element;
        var js = element;
        if (d.getElementById(id)) {
            return; }
        js = d.createElement(s);
        js.id = id;
        js.src = '//platform.linkedin.com/in.js';
        js.text = 'api_key: 86ihm2bra9vjg3';
        ljs.parentNode.insertBefore(js, ljs);
      }(document, 'script', 'linkedin-sdk'));
    //End of LinkedIn Login
  }

  // callbackFunction() {
  //   let app = this;
  //   function onSuccess(data) {
  //     socket.emit('user', data)
  //     cookie.save('userId', data.id, { path: '/' });
  //     cookie.save('name', data.firstName, { path: '/' });
  //     app.setState({
  //       type: 'events',
  //       data: {
  //         myEvent:['a','b', 'c'],
  //         allEvent: ['d', 'e' ]
  //       },
  //       userId: data.id,
  //       name: data.firstName});
  //   }

  //   function onError(error) {
  //   }

  //   IN.API.Raw("/people/~:(id,first-name,last-name,headline,location,industry,current-share,num-connections,summary,positions,picture-urls::(original),public-profile-url)?format=json").result(onSuccess).error(onError);
  // }

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
  // TODO still cant login using LinkedIn
  onLogin() {
    console.log("State is about to change to logged in");
    this.setState({
      type: 'loggedin'
    })
    // function onSuccess(data) {
    //   socket.emit('user', data)
    //   cookie.save('userId', data.id, { path: '/' });
    //   cookie.save('name', data.firstName, { path: '/' });
    //   this.setState({
    //     type: 'loggedin',
    //     data: {
    //       myEvent:['a','b', 'c'],
    //       allEvent: ['d', 'e' ]
    //     },
    //     userId: data.id,
    //     name: data.firstName});
    // }

    // function onError(error) {
    // }

    // IN.API.Raw("/people/~:(id,first-name,last-name,headline,location,industry,current-share,num-connections,summary,positions,picture-urls::(original),public-profile-url)?format=json").result(onSuccess).error(onError);
  }

  onLogout() {
    cookie.remove('userId', { path: '/' });
    cookie.remove('name', { path: '/' });
    this.setState({
        type: 'home',
        data: {},
        userId: null,
        name: null});
  }


  goToEventProfile() {
    console.log("State is about to change to testEvent");
    this.setState({
      type: 'event'
    })
  }

  goHome() {
    console.log("State is about to change to home");
    this.setState({
      type: 'home'
    })
  }

  render() {

    let topSectionPartial;
    let bottomSectionPartial;
    switch (this.state.type) {
      // When logging in
      case 'loggedin':
        console.log("Section, logged in state");
        topSectionPartial = <MyEvents goToEventProfileHandler={this.goToEventProfile} />;
        bottomSectionPartial = <AllEvents />;
        break;
      // When clicking a specific event in MyEvent section
      case 'event':
        console.log("Section, event state");
        topSectionPartial = <AllPeople goToPersonProfileHandler={this.seeProfile} />;
        bottomSectionPartial = <Schedule />;
        break;
      case 'userProfile':
        console.log("Section, userProfile state");
        
      // Home page partials
      default:
        console.log("Section, home state");
        topSectionPartial = <Welcome callbackFunction={this.callbackFunction} />;
        bottomSectionPartial = <AllEvents />;
    }

    if (!this.state.userId) {
      return (
      // TODO refactor props (i.e. store handler functions into one 'handlers' object)
      <div className="container">
        <NavBar urlPath={this.state.type} goHomeHandler={this.goHome} loginHandler={this.onLogin} logoutHandler={this.onLogout} />
        <section className="top-section row">
          {topSectionPartial}
        </section>
        <section className="bottom-section row">
          {bottomSectionPartial}
        </section>
      </div>
    )}
    // if (this.state.type === "events"){
    //    return <Event name={this.state.name} eventPage={this.eventPage} addEvent={this.addEvent} data={this.state.data} onLogout={this.onLogout}/>
    // }
    // if (this.state.type === "event"){
    //    return <EventProfile name={this.state.name} seeProfile={this.seeProfile} backToMain={this.backToMain} data={this.state.data} onLogout={this.onLogout}/>
    // }
    // if (this.state.type === "userProfile"){
    //    return <UserProfile name={this.state.name} backToEP={this.backToEP} data={this.state.data} onLogout={this.onLogout}/>
    // }
    return (
      <h1>ERROR</h1>
    )
  }
};

export default App;
