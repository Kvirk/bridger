import React, { Component } from 'react';
import LinkedinLogin from './LinkedInLogin.jsx';

class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		console.log("Rendering <Navbar />");

		// Changing content of partial depending on the state type (i.e. current URL path)
		let navItemsPartial;
		switch (this.props.urlPath) {
			// Not logged in
			case 'login':
				console.log("User is not logged in");
				navItemsPartial =
					<ul className="nav navbar-nav center">
						<li><LinkedinLogin callbackFunction={this.props.callbackFunctionCreateEvent} name={'Host Event'}/></li>
						<li><LinkedinLogin callbackFunction={this.props.callbackFunction} name={'Log In'}/></li>
					</ul>
			break;
			// Logged in, main events page
			case 'events':
				console.log("User is logged in, main events page")
				navItemsPartial =
					<ul className="nav navbar-nav center">
						<li><span onClick={this.props.eventsCreation}>Host Event</span></li>
						<li><span onClick={this.props.backToMain}>Events</span></li>
						<li><span onClick={this.props.onLogout}>Logout</span></li>
					</ul>
			break;
			// Logged in everywhere else
			default:
				console.log("User is logged in");
				navItemsPartial =
					<ul className="nav navbar-nav center">
						<li><span onClick={this.props.backToMain}>Events</span></li>
						<li><span onClick={this.props.onLogout}>Logout</span></li>
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
						<div className="navbar-brand">
							<img alt="Brand" src="http://i.imgur.com/X9cGCcR.png" />
						</div>
						<p className="navbar-text text-muted">
							{this.props.name}
						</p>
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
