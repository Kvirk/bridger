import React, { Component } from 'react';
import LinkedinLogin from './LinkedInLogIn.jsx';
import { Drawer } from 'react-toolbox/lib/drawer';
import { IconButton } from 'react-toolbox/lib/button';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.handleToggle = this.handleToggle.bind(this);
		this.state = { active: false }
	}

  handleToggle() {
    this.setState({ active: !this.state.active });
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
							<img alt="Brand" src="http://i.imgur.com/X9cGCcR.png" onClick={this.props.backToMain} />
						</div>
						<p className="navbar-text text-muted">
							{this.props.name}
						</p>
		        <IconButton className="iconButton" icon='menu' onClick={this.handleToggle} />
		        <Drawer type='right' active={this.state.active} onOverlayClick={this.handleToggle}>
		        	<br/>
		        	<br/>
		        	<br/>
		        	<br/>
		        	<br/>
      	      <List selectable ripple>
				        <ListSubHeader caption='Configuration' />
				        <ListItem caption='Host Event' leftIcon='send' onClick={this.props.eventsCreation} onClick={this.handleToggle} />
	  	          <ListItem caption='Events' leftIcon='delete' onClick={this.handleToggle} />
            	</List>
		        	{navItemsPartial}
		        </Drawer>
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
