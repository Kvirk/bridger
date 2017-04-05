import React, { Component } from 'react';
import Slider from 'react-slick';
import AllPeople from './AllPeople.jsx';
import {Tab, Tabs} from 'react-toolbox';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Dotdotdot from 'react-dotdotdot'
import moment from 'moment';
moment().format();

class EventProfile extends Component {
	constructor(props) {
		super(props);
		this.handleTabChange = this.handleTabChange.bind(this);
		this.state = { index: 0 };
	}

	componentDidMount() {
	}

	handleTabChange(index) {
		this.setState({
			index: index
		})
	}

	render() {
		var settings = {
			dots: true,
			// autoplay: true,
			// autoplaySpeed: 5000,
			// pauseOnHover: true,
		};

		if (window.innerWidth < 500) {
			settings.slidesToShow = 1;
		} else if (window.innerWidth < 600) {
			settings.slidesToShow = 2;
		} else if (window.innerWidth > 600 && window.innerWidth < 900) {
			settings.slidesToShow = 3;
		} else {
			settings.slidesToShow = 5;
		}

		let title_temp = (this.props.data.event.name).split(' ');
		let title_last = title_temp.pop();
		let title_first = title_temp.join(' ');
		let length = this.props.data.users.length
		let image = (this.props.data.event.picture_url ? this.props.data.event.picture_url : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQS5rDTpmXThNw027QY1tvoGIs_RNxF2i1HQvvTmNuoJPumnhY3')
		return (
			<div className="eventProfileContainer">
				<Card className="eventCard">
					<div className="titleDiv">
						<div><i className="material-icons calendarIcon">event</i>{title_first}<span>&nbsp;{title_last}</span></div>
					</div>
					<Tabs className="eventTabs" index={this.state.index} onChange={this.handleTabChange} fixed>
						<Tab label='Top Matches'></Tab>
						<Tab label='Search Guests'></Tab>
					</Tabs>
					{(this.state.index === 1) ? (
						<AllPeople data={this.props.data} seeProfile={this.props.seeProfile}/>
					) : (
						<div className="carouselProfile">
							<Slider {...settings}>
								{this.props.data.users.map((dat, i) => {
									return (
										<div key={i}>
											<Card className="carouselCardProfile">
												<CardMedia className="cardImage"
													aspectRatio="square"
													image= { dat.picture_url ? dat.picture_url : "http://vignette2.wikia.nocookie.net/filthy-frank/images/c/ce/Question-mark-face.jpg/revision/latest?cb=20160909100759" }
												/>
												<CardTitle className="cardUserTitle"
													title={dat.first_name + " " + dat.last_name}
													subtitle={dat.location}
												/>
												<CardText className="cardHeadline">
													{dat.headline}
												</CardText>
												<CardActions>
													<Button label="More Info" icon="person" className="connectButton" onClick={this.props.seeProfile.bind(null, dat)} primary raised />
												</CardActions>
											</Card>
										</div>
									)
								})}
							</Slider>
						</div>
					)}
					<div className="buttonsDiv">
						<CardActions>
							<Button className="leaveButton" label='back' icon='arrow_back' onClick={this.props.backToMain} />
							<Button className="leaveButton" onClick={this.props.leaveEvent.bind(null, this.props.data.event.id)} label="Leave Event" />
						</CardActions>
					</div>
				</Card>
			</div>
		)
	}
}

export default EventProfile;
