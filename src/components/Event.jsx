import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';

class Event extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return (
			<div className="eventsContainer">
			{this.props.data.myEvent.map((dat, i) => {
				return (
					<Card style={{width: '80%'}} key={i}>
						<CardTitle
							avatar="https://placeimg.com/80/80/animals"
							title='CREATOR NAME'
							subtitle={dat.venue}
						/>
						<CardMedia className="cardImage"
							aspectRatio="wide"
							image="http://www.lighthouselabs.ca/static-assets/lighthouse-labs.png"
						/>
						<CardTitle
							title={dat.name}
							subtitle={new Date(dat.start_time).toString().split(' ').slice(0, 5).join(' ')}
						/>
						<CardText>{dat.description}</CardText>
						<CardActions>
							<Button className="enterButton" onClick={this.props.eventPage.bind(null, dat.event_id)} label="Enter" />
						</CardActions>
					</Card>
				)
			})}


			</div>
		)
	}
};

export default Event;
