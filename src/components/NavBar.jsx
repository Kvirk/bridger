import React, { Component } from 'react';
import LinkedinLogin from './LinkedInLogin.jsx';

class NavBar extends Component {
	goToEvent(event) {
		console.log("Entering goToEvent function");
		this.props.goToEventHandler();
	}

	goHome(event) {
		console.log("Going back home");
		this.props.goHomeHandler();
	}

	render () {
		console.log("Rendering <Navbar />");

		// Changing content of partial depending on the state type (i.e. current URL path)
		let navItemsPartial;
		switch (this.props.urlPath) {
			case 'loggedin':
				console.log("User is logged in");
				navItemsPartial =
					<ul className="nav navbar-nav center">
						<li>
							<a href="#home" onClick={this.goHome.bind(this)}>Home</a>
						</li>
						<li>
							<a href="#myevents">MyEvents</a>
						</li>
						<li>
							<a href="#events">Upcoming Events</a>
						</li>
						<li>
							<a href="logout">Logout</a>
						</li>
					</ul>
				break;
			case 'event':
				console.log("Navbar, event state");
				navItemsPartial =
					<ul className="nav navbar-nav center">
						<li>
							<a href="#home" onClick={this.goHome.bind(this)}>Home</a>
						</li>
						<li>
							<a href="#attendees">Suggested People</a>
						</li>
						<li>
							<a href="#schedule">Schedule</a>
						</li>
						<li>
							<a href="#logout">Logout</a>
						</li>
					</ul>
				break;
			default:
				console.log("This is default (home page)");
				navItemsPartial =
					<ul className="nav navbar-nav center">
						{/*<li>
							<a href="#event" onClick={this.goToEvent.bind(this)}>Event 1</a>
						</li>*/}
						<li>
              <LinkedinLogin callbackFunction={this.props.callbackFunction}/>
						</li>
					</ul>
		}

		return (
		<nav className="navbar navbar-fixed-top" role="navigation">
			<div className="container">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<a className="navbar-brand" href="#">
						<img alt="Brand" src="https://image.freepik.com/free-icon/connected-circular-chains_318-39781.jpg" />
					</a>
				</div>
				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					{navItemsPartial}
				</div>
			</div>
		</nav>
		)
	}
}

export default NavBar
