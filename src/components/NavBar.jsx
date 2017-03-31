import React, { Component } from 'react';
import LinkedinLogin from './LinkedInLogIn.jsx';
import { Drawer } from 'react-toolbox/lib/drawer';
import { IconButton } from 'react-toolbox/lib/button';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';
import Avatar from 'react-toolbox/lib/avatar';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.handleToggle = this.handleToggle.bind(this);
		// Test
		this.handleTestingElasticsearch = this.handleTestingElasticsearch.bind(this);
		//End Test
		this.handleCreateEvent = this.handleCreateEvent.bind(this);
		this.handleBackToMain = this.handleBackToMain.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
		this.state = { active: false };
	}

  handleToggle() {
    this.setState({ active: !this.state.active });
  }

	// Test
	handleTestingElasticsearch(event) {
		event.preventDefault();
		this.props.handleTesting();
	}
	//End Test

  handleCreateEvent() {
  	this.handleToggle();
  	this.props.eventsCreation();
  }

  handleBackToMain() {
  	this.handleToggle();
  	this.props.backToMain();
  }

  handleLogOut() {
  	this.handleToggle();
  	this.props.onLogout();
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
					<ul className="nav navbar-nav">
						<li><LinkedinLogin callbackFunction={this.props.callbackFunction} name={'Log In'}/></li>
						<li><LinkedinLogin callbackFunction={this.props.callbackFunctionCreateEvent} name={'Host Event'}/></li>
					</ul>
			break;
			// Logged in, main events page
			case 'events':
				console.log("User is logged in, main events page")
				navItemsPartial =
					<div>
						<div className="avatarDrawer"><Avatar onClick={this.handleToggle}><img src={this.props.picture}/></Avatar></div>
						<Drawer className="drawer" type='right' active={this.state.active} onOverlayClick={this.handleToggle}>
						  <List selectable ripple>
								<ListItem caption='Test Elasticsearch' onClick={this.handleTestingElasticsearch} />
								<ListItem caption='Host Event' leftIcon='add' onClick={this.handleCreateEvent} />
						    <ListItem caption='Events' leftIcon='today' onClick={this.handleBackToMain} />
						    <ListItem caption='Log Out' leftIcon='power_settings_new' onClick={this.handleLogOut} />
						  </List>
						</Drawer>
					</div>
			break;
			// Logged in everywhere else
			default:
				console.log("User is logged in");
				navItemsPartial =
					<div>
						<div className="avatarDrawer"><Avatar onClick={this.handleToggle}><img src={this.props.picture}/></Avatar></div>
						<Drawer className="drawer" type='right' active={this.state.active} onOverlayClick={this.handleToggle}>
						  <List selectable ripple>
						    <ListItem caption='Events' leftIcon='today' onClick={this.handleBackToMain} />
						    <ListItem caption='Log Out' leftIcon='power_settings_new' onClick={this.handleLogOut} />
						  </List>
						</Drawer>
					</div>
		}
		return (
			<nav className="navbar navbar-fixed-top" role="navigation">
				<div className="container">
					<div className="navbar-brand">
						<img alt="Brand" src="http://i.imgur.com/X9cGCcR.png" onClick={this.props.backToMain} />
					</div>
				{navItemsPartial}
					{this.props.name !== undefined &&
						<p className="navbar-text pull-right text-muted" onClick={this.handleToggle}>
							{this.props.name}
						</p>
					}
				</div>
			</nav>
		)
	}
}

export default NavBar
