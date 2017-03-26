import React, { Component } from 'react';
import LinkedinLogin from './LinkedInLogin.jsx';

class Welcome extends Component {

	render () {
		console.log('Rendering <Welcome />');
		return (
			<header className="header-image">
				<div className="container">
					<div className="featurette" classID="about">
						<h2 className="featurette-heading">The Secret Is
							<span> Teamwork.</span>
						</h2>
						<p className="lead">Bridged connects you with the right people.</p>
					</div>
				</div>
				<hr className="featurette-divider"/>
			</header>
		)
	}
}

export default Welcome;
