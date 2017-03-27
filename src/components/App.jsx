import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import LinkedinLogin from './LinkedInLogin.jsx';
import cookie from 'react-cookie';
import EventsCreation from './EventsCreation.jsx';

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
		this.callbackFunctionCreateEvent = this.callbackFunctionCreateEvent.bind(this);
		this.callbackFunction = this.callbackFunction.bind(this);
		this.goToEventProfile = this.goToEventProfile.bind(this);
		// this.goHome= this.goHome.bind(this);
		this.eventsCreation = this.eventsCreation.bind(this);
		this.handleForm = this.handleForm.bind(this);
		this.state = {type: type,
				userId: cookie.load('userId'),
				name: cookie.load('name')
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
			socket.emit('user', data)
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


	goToEventProfile() {
		console.log("State is about to change to testEvent");
		this.setState({
			type: 'event'
		})
	}

	// goHome() {
	// 	console.log("State is about to change to home");
	// 	this.setState({
	// 		type: 'events'
	// 	})
	// }

	render() {
		if (!this.state.userId) {
			return (
				<div className="container">
					<NavBar urlPath={this.state.type} callbackFunctionCreateEvent={this.callbackFunctionCreateEvent} callbackFunction={this.callbackFunction} />
					<section className="top-section row">
						<Welcome />
					</section>
					<section className="bottom-section row">
						<AllEvents data={this.state.data}/>
					</section>
				</div>
		)}

		if (this.state.type === "events") {
			return (
				<div className="container">
					<NavBar urlPath={this.state.type} name={this.state.name} backToMain={this.backToMain} onLogout={this.onLogout} eventsCreation={this.eventsCreation} />
					<section className="top-section row">
						<Event name={this.state.name} eventsCreation={this.eventsCreation} eventPage={this.eventPage} addEvent={this.addEvent} data={this.state.data} onLogout={this.onLogout} />
					</section>
					<section className="bottom-section row">
						<AllEvents />
					</section>
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
			 			<UserProfile name={this.state.name} backToEP={this.backToEP} data={this.state.data} onLogout={this.onLogout}/>
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
