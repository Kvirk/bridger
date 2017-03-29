import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import LinkedinLogin from './LinkedInLogin.jsx';
import cookie from 'react-cookie';
import EventsCreation from './EventsCreation.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Welcome from './Welcome.jsx';
import AllEvents from './AllEvents.jsx';
import MyEvents from './MyEvents.jsx';
import AllPeople from './AllPeople.jsx';
import PersonProfile from './PersonProfile.jsx';
import Schedule from './Schedule.jsx';

import UserProfile from './UserProfile.jsx';
import EventProfile from './EventProfile.jsx';
import Event from './Event.jsx';


let socket = io.connect();

class App extends Component {
  constructor(props) {
    super(props);
    let type = 'blank';
    let data = {allEvent: [{ id: 2,
      name: "Techvibes Techfest",
      description: "A unique recruiting event. Techfest…",
      venue: "Vancouver Convention Centre",
      start_time: "2017-03-25T21:39:04.753Z",
      end_time: "2017-03-25T21:39:04.753Z" }]};
    if (cookie.load('userId')){
      let data2 = {
        userId: cookie.load('userId'),
      }
      socket.emit('userLogin', data2)
    } else {
      socket.emit('getData', 'give me more')
      type = 'login'
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.seeProfile = this.seeProfile.bind(this);
    this.backToMain = this.backToMain.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.eventPage = this.eventPage.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
    this.callbackFunctionCreateEvent = this.callbackFunctionCreateEvent.bind(this)
    this.goToEventProfile = this.goToEventProfile.bind(this);
    this.eventsCreation = this.eventsCreation.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.state = {type,
        userId: cookie.load('userId'),
        name: cookie.load('name'),
        data
      }
  }

  componentDidMount() {
    const app = this;
    socket.on('connect', function(data) {});
    socket.on('responseUserLogin', function(data) {
      app.setState({
        type: 'events',
        data: {
          myEvent: data.userEvent,
          allEvent: data.allEvent,
        }});
    });
    socket.on('eventAdded', function(data) {
      let data2 = {
        userId: cookie.load('userId'),
      }
      socket.emit('userLogin', data2)
    });
    socket.on('responseGetEvent', function(data){
      app.setState({
      type: 'event',
      data: data
      })
    })
    socket.on('responseGetData', function(data){
      console.log(data)
      app.setState({
      data: data
      })
    })
    socket.on('responseMessage', function(data){
      app.setState({
        data
      })
    })
    socket.on('OMGmessage', function(data){
      app.setState({
        type: 'userProfile',
        data: data
      });
    })
  }

	callbackFunction() {
		let app = this;
		function onSuccess(data) {
			let data2 = {
				userId: data.id,
			}
      console.log('inside the login')
			socket.emit('user', data)
			socket.emit('userLogin', data2)
			cookie.save('userId', data.id, { path: '/' });
			cookie.save('name', data.firstName, { path: '/' });
			app.setState({
				userId: data.id,
				name: data.firstName,
        data: {
          myEvent: [],
          allEvent: [{ id: 2,
                      name: "Techvibes Techfest",
                      description: "A unique recruiting event. Techfest…",
                      venue: "Vancouver Convention Centre",
                      start_time: "2017-03-25T21:39:04.753Z",
                      end_time: "2017-03-25T21:39:04.753Z" }]
        }
      });
		}
		function onError(error) {
		}

		IN.API.Raw("/people/~:(id,first-name,last-name,headline,location,industry,current-share,num-connections,summary,positions,picture-urls::(original),public-profile-url)?format=json").result(onSuccess).error(onError);
	}

	callbackFunctionCreateEvent() {
		let app = this;
		function onSuccess(data) {
			let data2 = {
				userId: data.id
			}
			socket.emit('user', data)
			cookie.save('userId', data.id, { path: '/' });
			cookie.save('name', data.firstName, { path: '/' });
			app.setState({
				type: 'creation',
				userId: data.id,
				name: data.firstName});
		}
		function onError(error) {
		}

		IN.API.Raw("/people/~:(id,first-name,last-name,headline,location,industry,current-share,num-connections,summary,positions,picture-urls::(original),public-profile-url)?format=json").result(onSuccess).error(onError);
	}

  sendMessage(message, userID){
    let currentMessage = this.state.data.message;
    currentMessage.push(message);
    let data = this.state.data;
    data['message'] = currentMessage;
    socket.emit("message", data)
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
    let sendData = {
      event,
      userId: cookie.load('userId')
    }
    socket.emit('getEvent', sendData)
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

  seeProfile(data) {
    let data2 = data;
    console.log(data)
    data2['message'] = [];
    this.setState({
      type: 'userProfile',
      data: data2
    });
  }

	onLogout() {
    let data = {allEvent: [{ id: 2,
      name: "Techvibes Techfest",
      description: "A unique recruiting event. Techfest…",
      venue: "Vancouver Convention Centre",
      start_time: "2017-03-25T21:39:04.753Z",
      end_time: "2017-03-25T21:39:04.753Z" }]};
    socket.emit('destroy', cookie.load('userId'));
		cookie.remove('userId', { path: '/' });
		cookie.remove('name', { path: '/' });
    socket.emit('getData', 'give me more');
		this.setState({
				type: 'login',
				userId: null,
				name: null,
        data
      });
	}


	goToEventProfile() {
		console.log("State is about to change to testEvent");
		this.setState({
			type: 'event'
		})
	}

	render() {
		if (this.state.type === "login") {
			return (
        <div className="container">
          <NavBar urlPath={this.state.type} callbackFunctionCreateEvent={this.callbackFunctionCreateEvent} callbackFunction={this.callbackFunction} />
          <section className="top-section row">
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              transitionAppearTimeout={1000}
              transitionAppear={true}>
              <Welcome />
            </ReactCSSTransitionGroup>
          </section>
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              transitionAppearTimeout={1000}
              transitionAppear={true}>
            <section className="bottom-section row">
              <AllEvents data={this.state.data} addEvent={this.callbackFunction}/>
            </section>
            </ReactCSSTransitionGroup>
        </div>
		)}

		if (this.state.type === "events") {
			return (
				<div className="container">
					<NavBar urlPath={this.state.type} name={this.state.name} backToMain={this.backToMain} onLogout={this.onLogout} eventsCreation={this.eventsCreation} />
            <section className="top-section row">
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              transitionAppearTimeout={1000}
              transitionAppear={true}>
  						<Event name={this.state.name} eventsCreation={this.eventsCreation} eventPage={this.eventPage} addEvent={this.addEvent} data={this.state.data} onLogout={this.onLogout} />
  					</ReactCSSTransitionGroup>
            </section>
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
              transitionAppearTimeout={1000}
              transitionAppear={true}>
  					<section className="bottom-section row">
  						<AllEvents data={this.state.data} addEvent={this.addEvent}/>
  					</section>
            </ReactCSSTransitionGroup>
				</div>
			)
		}
		if (this.state.type === "creation") {
			return (
				<div className="container">
					<NavBar urlPath={this.state.type} name={this.state.name} backToMain={this.backToMain} onLogout={this.onLogout} />
				 	<section className="top-section row">
					 	<EventsCreation  handleForm={this.handleForm}/>
					</section>
				</div>
			)
		}
		if (this.state.type === "event") {
			return (
				<div className="container">
					<NavBar urlPath={this.state.type} name={this.state.name} backToMain={this.backToMain} onLogout={this.onLogout} />
				 	<section className="top-section row">
			 			<EventProfile name={this.state.name} seeProfile={this.seeProfile} backToMain={this.backToMain} data={this.state.data} onLogout={this.onLogout} />
					</section>
				</div>
			)
		}
		if (this.state.type === "userProfile") {
			return (
				<div className="container">
					<NavBar urlPath={this.state.type} name={this.state.name} backToMain={this.backToMain} onLogout={this.onLogout} />
				 	<section className="top-section row">
				 		<UserProfile name={this.state.name} sendMessage={this.sendMessage} backToEP={this.eventPage} data={this.state.data} onLogout={this.onLogout}/>
					</section>
				</div>
			)
		}
		return (
			<h1>ERROR</h1>
		)
	}
};

export default App;
