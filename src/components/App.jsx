import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import LinkedinLogin from './LinkedInLogIn.jsx';
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
import ProgressBar from 'react-toolbox/lib/progress_bar';
import {Tab, Tabs} from 'react-toolbox';

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

		this.sendMessage = this.sendMessage.bind(this);
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
		this.handleTabChange = this.handleTabChange.bind(this);

		this.testElasticSearch = this.testElasticSearch.bind(this);

		this.state = {type,
				userId: cookie.load('userId'),
				name: cookie.load('name'),
				picture_url: cookie.load('picture_url'),
				data,
				index: 1
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

		//TEST Elasticsearch
		socket.on('elasticsearch', function(data) {
			console.log("data from server using elasticsearch", data);
		})
	}

	callbackFunction() {
		let app = this;
		function onSuccess(data) {
			let picture_url = !data.pictureUrls.values ? `https://pbs.twimg.com/profile_images/594731918647816193/dxinx-l6.png` : data.pictureUrls.values[0];
			let data2 = {
				userId: data.id,
			}
			console.log('inside the login')
			socket.emit('user', data)
			socket.emit('userLogin', data2)
			cookie.save('userId', data.id, { path: '/' });
			cookie.save('name', data.firstName, { path: '/' });
			cookie.save('picture_url', picture_url, { path: '/' });
			app.setState({
				userId: data.id,
				name: data.firstName,
				picture_url,
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
			let picture_url = !data.pictureUrls.values ? `https://pbs.twimg.com/profile_images/594731918647816193/dxinx-l6.png` : data.pictureUrls.values[0];
			let data2 = {
				userId: data.id
			}
			socket.emit('user', data)
			cookie.save('userId', data.id, { path: '/' });
			cookie.save('name', data.firstName, { path: '/' });
			cookie.save('picture_url', picture_url, { path: '/' });
			app.setState({
				type: 'creation',
				picture_url,
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
			formInput:formInput,
			creator_name: cookie.load('name'),
			creator_picture_url: cookie.load('picture_url')
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
		cookie.remove('picture_url', { path: '/' });
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

	handleTabChange(index) {
		this.setState({
			index: index
		})
	}

	// Testing elastic search
	testElasticSearch() {
		console.log("This is testing elasticsearch");
		console.log("user id", this.state.userId);
		socket.emit('elasticsearch', this.state.userId);
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
					<NavBar urlPath={this.state.type} handleTesting={this.testElasticSearch} name={this.state.name} picture={this.state.picture_url} backToMain={this.backToMain} onLogout={this.onLogout} eventsCreation={this.eventsCreation} />
						<section>
							<ReactCSSTransitionGroup
								transitionName="example"
								transitionEnterTimeout={1000}
								transitionLeaveTimeout={1000}
								transitionAppearTimeout={1000}
								transitionAppear={true}>
								<Tabs className="tabs" index={this.state.index} onChange={this.handleTabChange} fixed>
									<Tab ripple={false} label='All Events'></Tab>
									<Tab ripple={false} label='Your Events'></Tab>
								</Tabs>
								{(this.state.index === 0) ? (
									<AllEvents data={this.state.data} addEvent={this.addEvent} />
								) : (
									<Event name={this.state.name} eventsCreation={this.eventsCreation} eventPage={this.eventPage} addEvent={this.addEvent} data={this.state.data} onLogout={this.onLogout} />
								)}
							</ReactCSSTransitionGroup>
						</section>
				</div>
			)
		}
		if (this.state.type === "creation") {
			return (
				<div className="container">
					<NavBar urlPath={this.state.type} name={this.state.name} picture={this.state.picture_url} backToMain={this.backToMain} onLogout={this.onLogout} />
					<section className="top-section row">
						<EventsCreation handleForm={this.handleForm} backToMain={this.backToMain} />
					</section>
				</div>
			)
		}
		if (this.state.type === "event") {
			return (
				<div className="container">
					<NavBar urlPath={this.state.type} name={this.state.name} picture={this.state.picture_url} backToMain={this.backToMain} onLogout={this.onLogout} />
					<section className="top-section row">
						<EventProfile name={this.state.name} seeProfile={this.seeProfile} backToMain={this.backToMain} data={this.state.data} onLogout={this.onLogout} />
					</section>
				</div>
			)
		}
		if (this.state.type === "userProfile") {
			return (
				<div className="container">
					<NavBar urlPath={this.state.type} name={this.state.name} picture={this.state.picture_url} backToMain={this.backToMain} onLogout={this.onLogout} />
					<section className="top-section row">
						<UserProfile name={this.state.name} picture={this.state.picture_url} sendMessage={this.sendMessage} backToEP={this.eventPage} data={this.state.data} onLogout={this.onLogout}/>
					</section>
				</div>
			)
		}
		return (
			<ProgressBar className="loadingPage" type='circular' mode='indeterminate' multicolor />
		)
	}
};

export default App;
