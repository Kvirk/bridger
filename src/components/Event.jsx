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
		const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

		return (
			<div>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				{this.props.data.myEvent.map((dat, i) => {
					return <button key={i} onClick={this.props.eventPage.bind(null, dat.event_id)}>{dat.name}</button>
				})}
				<div>
					{this.props.data.allEvent.map((dat, i) => {
						return <button key={i*3} onClick={this.props.addEvent.bind(null, dat.id)}>{dat.name}</button>
					})}
				</div>
					<Card style={{width: '75%'}}>
						<CardTitle
							avatar="https://placeimg.com/80/80/animals"
							title="Avatar style title"
							subtitle="Subtitle here"
						/>
						<CardMedia
							aspectRatio="wide"
							image="https://placeimg.com/800/450/nature"
						/>
						<CardTitle
							title="Title goes here"
							subtitle="Subtitle here"
						/>
						<CardText>{dummyText}</CardText>
						<CardActions>
							<Button label="Action 1" />
							<Button label="Action 2" />
						</CardActions>
					</Card>
			</div>
		)
	}
};

export default Event;
