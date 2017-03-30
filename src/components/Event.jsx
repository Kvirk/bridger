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
		console.log('Rendering <Event />');
		return (
			<div className="eventsContainer">
				{this.props.data.myEvent.map((dat, i) => {
					return (
						<Card style={{width: '70%'}} raised key={i}>
							<CardTitle
								avatar="https://placeimg.com/80/80/animals"
								title={dat.creator_name}
								subtitle={dat.venue}
							/>
							<CardMedia className="cardImage"
								aspectRatio="square"
								image={dat.picture_url ? dat.picture_url: "https://placeimg.com/80/80/nature"}
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
