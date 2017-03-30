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
						<Card style={{width: '75%'}} raised key={i}>
							<CardTitle
								avatar={dat.creator_picture_url ? dat.creator_picture_url : "http://vignette2.wikia.nocookie.net/filthy-frank/images/c/ce/Question-mark-face.jpg/revision/latest?cb=20160909100759"}
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
								<Button className="leaveButton" onClick={this.props.leaveEvent.bind(null, dat.event_id)} label="Leave Event" />
							</CardActions>
						</Card>
					)
				})}
			</div>
		)
	}
};

export default Event;
