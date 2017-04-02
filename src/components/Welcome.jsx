import React, { Component } from 'react';

class Welcome extends Component {

	render () {
		console.log('Rendering <Welcome />');
		return (
			<header className="header-image">
				<div className="container">
					<div className="featurette" classID="about">
						<h2 className="featurette-heading">Together,
							<div className="subheading"> We Can Do Amazing Things</div>
						</h2>
						<p className="lead">Bridger helps you reach your full potential by connecting you with the right people.</p>
					</div>
				</div>
			</header>
		)
	}
}

export default Welcome;
