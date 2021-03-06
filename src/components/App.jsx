import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import NavBar from './NavBar.jsx';
import LinkedinLogin from './LinkedInLogIn.jsx';
import cookie from 'react-cookie';
import EventsCreation from './EventsCreation.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Welcome from './Welcome.jsx';
import AllEvents from './AllEvents.jsx';
import SeedPeople from './SeedPeople.jsx';
import AllEventsLoggedIn from './AllEventsLoggedIn.jsx';
import MyEvents from './MyEvents.jsx';
import PersonProfile from './PersonProfile.jsx';
import Schedule from './Schedule.jsx';
import UserProfile from './UserProfile.jsx';
import EventProfile from './EventProfile.jsx';
import Event from './Event.jsx';
import Footer from './Footer.jsx';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import {Tab, Tabs} from 'react-toolbox';
import AlertContainer from 'react-alert';
import { Button } from 'react-toolbox/lib/button';

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
		this.leaveEvent = this.leaveEvent.bind(this);
		this.eventPage = this.eventPage.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.callbackFunction = this.callbackFunction.bind(this);
		this.callbackFunctionCreateEvent = this.callbackFunctionCreateEvent.bind(this)
		this.goToEventProfile = this.goToEventProfile.bind(this);
		this.eventsCreation = this.eventsCreation.bind(this);
		this.handleForm = this.handleForm.bind(this);
		this.handleTabChange = this.handleTabChange.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.join = this.join.bind(this);
		this.reject = this.reject.bind(this);

		this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'light',
      time: 10000,
      transition: 'scale'
    };


		this.state = {
				type,
				userId: cookie.load('userId'),
				name: cookie.load('name'),
				picture_url: cookie.load('picture_url'),
				data,
				index: 0
		}
	}

	componentDidMount() {
		const app = this;
		socket.on('connect', function(data) {});
		socket.on('responseUserLogin', function(data) {
			document.body.scrollTop = 0;
			socket.emit('indexingData');
			socket.emit('elasticsearch', cookie.load('userId'));
			app.setState({
				type: 'events',
				data: {
					myEvent: data.userEvent,
					allEvent: data.allEvent,
				}});
		});

		socket.on('eventAdded', function(data) {
			document.body.scrollTop = 0;
			document.body.scrollTop = 0;
			let data2 = {
				userId: cookie.load('userId')
			}
			socket.emit('userLogin', data2)
		});

		socket.on('eventLeft', function(data) {
			document.body.scrollTop = 0;
			let data2 = {
				userId: cookie.load('userId')
			}
			socket.emit('userLogin', data2)
		});

		socket.on('responseGetEvent', function(data){
			document.body.scrollTop = 0;
			app.setState({
			type: 'event',
			data: data
			})
		});

		socket.on('responseGetData', function(data){
			document.body.scrollTop = 0;
			app.setState({
			data: data
			})
		});

		socket.on('responseMessage', function(data){
			app.setState({
				data
			})
		});

		socket.on('OMGmessage', function(data){
			if(app.state.type === 'userProfile'){
				app.setState({
				 	type: 'userProfile',
				 	data: data
				 });
			} else {
				app.showAlert(data.first_name);
				app.setState({
				 	alert: data
				 });
			}
		});

		socket.on('elasticsearch', function(message) {
		});

		socket.on('indexingData', function (message) {
		});
	}

	componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
	}

	showAlert(name){
    msg.show(`${name} sent you a message`, {
	      time: 10000,
	      type: 'success',
	      icon: <main className='note'>
	      				<div className='button'>
	      					<Button className='accept' onClick={this.join}>Reply</Button>
	      				</div>
	      				<div className='button'>
	      					<Button className='reject' onClick={this.reject}>Block</Button>
	      				</div>
	      			</main>
	    });
	}

	join(){
		msg.removeAll();
		this.setState({
		 	type: 'userProfile',
		 	data: this.state.alert
		});
	}

	reject(){
		msg.removeAll();
		socket.emit('reject', this.state.alert)
	}

	callbackFunction() {
		let app = this;
		function onSuccess(data) {
			let picture_url = `https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png`;
			let data2 = {
				userId: data.id,
			}
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
			let picture_url = `https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png`;
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

	sendMessage(message, userID) {
		let currentMessage = this.state.data.message;
		currentMessage.push(message);
		let data = this.state.data;
		data['message'] = currentMessage;
		socket.emit("message", data)
	}

	addEvent(event) {
		let data = {
			userId: cookie.load('userId'),
			eventId: event
		}
		socket.emit("addEvent", data)
	}

	leaveEvent(event) {
		let data = {
			userId: cookie.load('userId'),
			eventId: event
		}
		socket.emit("leaveEvent", data)
	}

	handleForm(formInput) {
		let contentToServer = {
			formInput:formInput,
			creator_name: cookie.load('name')
		}
		let data2 = {
				userId: cookie.load('userId'),
		}
		socket.emit('createEvent', contentToServer)
		socket.emit('userLogin', data2)
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
		data2['message'] = [];
		this.setState({
			type: 'userProfile',
			data: data2
		});
		document.body.scrollTop = 0;
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
		this.setState({
			type: 'event'
		})
	}

	handleTabChange(index) {
		this.setState({
			index: index
		})
	}

	render() {
		if (this.state.type === "login") {
			return (
				<div className="container-non-responsive">
					<NavBar urlPath={this.state.type} callbackFunctionCreateEvent={this.callbackFunctionCreateEvent} callbackFunction={this.callbackFunction} />
					<section className="top-section row">
						<ReactCSSTransitionGroup
							className="welcome-span"
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
							<h4 className="featurette-heading whatIsIt">Select Or Host An Event</h4>
							<AllEvents data={this.state.data} addEvent={this.callbackFunction}/>
						</section>
						</ReactCSSTransitionGroup>
						<section className="bottom-section2 row">
							<h4 className="featurette-heading whatIsIt">Get a list of matches, based on skills, professions, and more</h4>
							<SeedPeople callbackFunction={this.callbackFunction} />
						</section>
						<Footer scrollUp={this.scrollUp} />
				</div>
		)}

		if (this.state.type === "events") {
			return (
				<div className="container-non-responsive">
					<NavBar urlPath={this.state.type} handleTesting={this.testElasticSearch} name={this.state.name} picture={this.state.picture_url} backToMain={this.backToMain} onLogout={this.onLogout} eventsCreation={this.eventsCreation} />
						<section>
							<ReactCSSTransitionGroup
								transitionName="example"
								transitionEnterTimeout={1000}
								transitionLeaveTimeout={1000}
								transitionAppearTimeout={1000}
								transitionAppear={true}>

								<Tabs className="tabs" index={this.state.index} onChange={this.handleTabChange} fixed>
									<Tab label='Your Events'></Tab>
									<Tab label='All Events'></Tab>
								</Tabs>
								{(this.state.index === 0) ? (
									<Event name={this.state.name} eventsCreation={this.eventsCreation} eventPage={this.eventPage} addEvent={this.addEvent} leaveEvent={this.leaveEvent} data={this.state.data} onLogout={this.onLogout} />
								) : (
									<AllEventsLoggedIn data={this.state.data} addEvent={this.addEvent} />
								)}
							</ReactCSSTransitionGroup>
						</section>
						<AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
						<Footer />
				</div>
			)
		}
		if (this.state.type === "creation") {
			return (
				<div className="container-non-responsive">
					<NavBar urlPath={this.state.type} name={this.state.name} picture={this.state.picture_url} backToMain={this.backToMain} onLogout={this.onLogout} />
					<section className="top-section row">
						<EventsCreation  handleForm={this.handleForm} backToMain={this.backToMain} />
					</section>
					<AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
					<Footer />
				</div>
			)
		}
		if (this.state.type === "event") {
			return (
				<div className="container-non-responsive">
					<NavBar urlPath={this.state.type} name={this.state.name} picture={this.state.picture_url} backToMain={this.backToMain} onLogout={this.onLogout} />
					<ReactCSSTransitionGroup
						transitionName="example"
						transitionEnterTimeout={1000}
						transitionLeaveTimeout={1000}
						transitionAppearTimeout={1000}
						transitionAppear={true}>
					<section className="top-section row">
						<EventProfile name={this.state.name} seeProfile={this.seeProfile} backToMain={this.backToMain} leaveEvent={this.leaveEvent} data={this.state.data} onLogout={this.onLogout} />
					</section>
					</ReactCSSTransitionGroup>
					<AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
					<Footer />
				</div>
			)
		}
		if (this.state.type === "userProfile") {
			return (
					<div className="container-non-responsive">
						<NavBar urlPath={this.state.type} name={this.state.name} picture={this.state.picture_url} backToMain={this.backToMain} onLogout={this.onLogout} />
						<section className="top-section row">
							<ReactCSSTransitionGroup className="reactSpan"
								transitionName="example"
								transitionEnterTimeout={1000}
								transitionLeaveTimeout={1000}
								transitionAppearTimeout={1000}
								transitionAppear={true}>
							<UserProfile name={this.state.name} picture={this.state.picture_url} sendMessage={this.sendMessage} backToEP={this.eventPage} data={this.state.data} onLogout={this.onLogout}/>
							</ReactCSSTransitionGroup>
						</section>
						<AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
						<Footer/>
					</div>
			)
		}
		return (
			<ProgressBar className="loadingPage" type='circular' mode='indeterminate' multicolor />
		)
	}
};

export default App;
