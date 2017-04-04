import React, { Component } from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Dotdotdot from 'react-dotdotdot'
import moment from 'moment';
moment().format();

class AllEvents extends Component {

	render () {
		console.log('Rendering <AllEvent />');
		var settings = {
			dots: true,
			// autoplay: true,
			// autoplaySpeed: 5000,
			// pauseOnHover: true,
		};
		window.innerWidth < 600 ? settings.slidesToShow = 1 : settings.slidesToShow = 3;

		return (
			<div className="carousel">
				{this.props.data.allEvent[0] ? (
				<Slider {...settings}>
					{this.props.data.allEvent.map((dat, i) => {
						return (
							<div key={i}>
								<Card className="carouselCard">
									<CardTitle
										avatar={dat.creator_picture_url ? dat.creator_picture_url : "http://vignette2.wikia.nocookie.net/filthy-frank/images/c/ce/Question-mark-face.jpg/revision/latest?cb=20160909100759"}
										title={dat.creator_name}
									/>
									<CardMedia className="cardImage"
										aspectRatio="square"
										image={dat.picture_url ? dat.picture_url: "https://placeimg.com/80/80/nature"}
									/>
									<CardTitle
										title={dat.name}
										subtitle={moment(dat.start_time).format('MMMM Do, h:mm a')}
									/>
									<CardText>
										<Dotdotdot clamp={2}>{dat.venue}</Dotdotdot>
									</CardText>
									<CardText>
										<Dotdotdot clamp={2}>{dat.description}</Dotdotdot>
									</CardText>
								</Card>
							</div>
						)
					})}
				</Slider>
				) : (
					<h1 className="jumbotron text-muted">No Events</h1>
				)}
			</div>
		)
	}
}

export default AllEvents;
