import React, { Component } from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Dotdotdot from 'react-dotdotdot'
import moment from 'moment';
moment().format();

class EventProfile extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		var settings = {
			dots: true,
			// autoplay: true,
			// autoplaySpeed: 5000,
			// pauseOnHover: true,
		};

		if (window.innerWidth < 600) {
			settings.slidesToShow = 2;
		} else if (window.innerWidth > 600 && window.innerWidth < 900) {
			settings.slidesToShow = 3;
		}
		else {
			settings.slidesToShow = 5;
		}
		// window.innerWidth < 600 ? settings.slidesToShow = 2 : settings.slidesToShow = 5;
		// window.innerWidth > 600 && window.innerWidth < 900 ? settings.slidesToShow = 3 : settings.slidesToShow = 2;

		let length = this.props.data.users.length
		let image = (this.props.data.event.picture_url ? this.props.data.event.picture_url : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQS5rDTpmXThNw027QY1tvoGIs_RNxF2i1HQvvTmNuoJPumnhY3')
		return (
			<div className="eventProfileContainer">
				<div className="eventsContainer">
					<Card className="eventCard" raised>
						<div className="imageDiv">
							<CardMedia className="cardImage"
								aspectRatio="square"
								image={image}
							/>
						</div>
						<div className="centerDiv">
	            <CardTitle className="cardTitle"
	              title={this.props.data.event.name}
	            />
	            <CardText className="cardDescription">
	              {this.props.data.event.description}
	            </CardText>
	          </div>
	          <div className="leftDiv">
		          <CardText className="cardTime">
		            <div className="month">
		              {moment(this.props.data.event.start_time).format('MMM').toUpperCase()}
		            </div>
		            <div className="date">
		              {moment(this.props.data.event.start_time).format('DD')}
		            </div>
		            TIME:
		            <div>{moment(this.props.data.event.start_time).format('h:mm a').toUpperCase()} - {moment(this.props.data.event.end_time).format('h:mm a').toUpperCase()}</div>
		          </CardText>
		          <CardText className="cardVenue">
		            LOCATION:
		            <div>{this.props.data.event.venue}</div>
		          </CardText>
		          <CardText className="cardHost">
		            HOST:<div> {this.props.data.event.creator_name}</div>
		          </CardText>
		        </div>
						<div className="buttonsDiv">
	            <CardActions>
								<Button className="leaveButton" label='back' onClick={this.props.backToMain} />
								<Button className="leaveButton" onClick={this.props.leaveEvent.bind(null, this.props.data.event.id)} label="Leave Event" />
	            </CardActions>
	          </div>
					</Card>
					<h4 className="featurette-heading whatIsIt">Top 5 Matches:</h4>
					<div className="carousel">
						<Slider {...settings}>
							{this.props.data.users.map((dat, i) => {
								return (
									<div key={i}>
										<Card className="carouselCardSeed">
											<CardMedia className="cardImage"
												aspectRatio="square"
												image= { dat.picture_url ? dat.picture_url : "http://vignette2.wikia.nocookie.net/filthy-frank/images/c/ce/Question-mark-face.jpg/revision/latest?cb=20160909100759" }
											/>
											<CardTitle
												title={dat.first_name + " " + dat.last_name}
												subtitle={dat.location}
											/>
											<CardText>
												{dat.headline}
											</CardText>
											<CardActions>
												<Button label="Connect" className="createButton" onClick={this.props.seeProfile.bind(null, dat)} raised />
											</CardActions>
										</Card>
									</div>
								)
							})}
						</Slider>
					</div>
				</div>
			</div>
		)
	}
}

export default EventProfile;
