import React, { Component } from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox/lib/button';

class AllEvents extends Component {

	render () {
		console.log('Rendering <AllEvent />');
		var settings = {
			dots: true,
			slidesToShow: 3,
			// centerMode: true,
		};
		return (
			<div className="carousel">
				<Slider {...settings}>
					{this.props.data.allEvent.map((dat, i) => {
						return (
							<div>
								<Card style={{width: '350px', height: '600px'}} key={i}>
									<CardTitle
										avatar="https://placeimg.com/80/80/animals"
										title="CREATOR NAME"
										subtitle={dat.venue}
									/>
									<CardMedia className="cardImage"
										aspectRatio="wide"
										image="https://placeimg.com/800/450/nature"
									/>
									<CardTitle
										title={dat.name}
										subtitle={new Date(dat.start_time).toString().split(' ').slice(0, 5).join(' ')}
									/>
									<CardText>{dat.description}</CardText>
									<CardActions>
										<Button label="Action 1" />
										<Button label="Action 2" />
									</CardActions>
								</Card>
							</div>
						)
					})}
				</Slider>
			</div>
		)
	}
}

export default AllEvents;
