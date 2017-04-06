import React, { Component } from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Dotdotdot from 'react-dotdotdot'

class SeedPeople extends Component {

	constructor(props) {
		super(props),
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		e.preventDefault();
		IN.User.authorize(this.props.callbackFunction, '');
	}

	render () {
		console.log('Rendering <SeedPeople />');
		var settings = {
			dots: true,
			autoplay: true,
			autoplaySpeed: 3000,
			pauseOnHover: true,
		};
		window.innerWidth < 600 ? settings.slidesToShow = 2 : settings.slidesToShow = 4;

		return (
			<div className="carousel">
				<Slider {...settings}>
					<div>
						<Card className="carouselCardSeed">
							<CardMedia className="cardImage"
								aspectRatio="square"
								image="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAsjAAAAJDhmYzBmNDU0LTNlZTAtNGZmNi1iMmE4LTIzYzZjNTRiOWRlZQ.jpg"
							/>
							<CardTitle
								title="David Ng"
								subtitle="Vancouver, Canada Area"
							/>
							<CardText>
								Web Developer | H.B.Sc - Economics, Mathematics
							</CardText>
						</Card>
					</div>
					<div>
						<Card className="carouselCardSeed">
							<CardMedia className="cardImage"
								aspectRatio="square"
								image="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAmcAAAAJDU4MmI4Mzk2LTM5MzAtNGIxYi04ZjI0LTc3MzE5OWIwMjk3Mg.jpg"
							/>
							<CardTitle
								title="Hans Kurniadi"
								subtitle="Vancouver, Canada Area"
							/>
							<CardText>
								Intern at Citi | Beedie School of Business at Simon Fraser University
							</CardText>
						</Card>
					</div>
					<div>
						<Card className="carouselCardSeed">
							<CardMedia className="cardImage"
								aspectRatio="square"
								image="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA0CAAAAJDg3YzIwODI0LWFlZjAtNDQwYy05YmYxLTUwYzU2N2YxOGFhMg.jpg"
							/>
							<CardTitle
								title="Richard Hsieh"
								subtitle="Vancouver, Canada Area"
							/>
							<CardText>
								Assistant Sales Manager at Tropical Link Canada Ltd. | McGill University
							</CardText>
						</Card>
					</div>
					<div>
						<Card className="carouselCardSeed">
							<CardMedia className="cardImage"
								aspectRatio="square"
								image="https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/7/005/066/276/0772b04.jpg"
							/>
							<CardTitle
								title="Kirat Virk"
								subtitle="Vancouver, Canada Area"
							/>
							<CardText>
								Full Stack Web Developer seeking opportunities
							</CardText>
						</Card>
					</div>
					<div>
						<Card className="carouselCardSeed">
							<CardMedia className="cardImage"
								aspectRatio="square"
								image="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA3JAAAAJGNkMDFkNTliLWM1ZDgtNGY3MS05ODRlLTZmYTJkMzM3MTk1Ng.jpg"
							/>
							<CardTitle
								title="Ziyu Steven Huang"
								subtitle="San Francisco, California"
							/>
							<CardText>
								Assistant Store Manager at AT&T
							</CardText>
						</Card>
					</div>
					<div>
						<Card className="carouselCardSeed">
							<CardMedia className="cardImage"
								aspectRatio="square"
								image="https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/094/161/10b63b9.jpg"
							/>
							<CardTitle
								title="Boris Chea"
								subtitle="Vancouver, Canada Area"
							/>
							<CardText>
								Store Manager at Structube
							</CardText>
						</Card>
					</div>
					<div>
						<Card className="carouselCardSeed">
							<CardMedia className="cardImage"
								aspectRatio="square"
								image="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAATwAAAAJDVkNjBlODY5LTA3OTMtNDBlYi04ZTQ4LWQ4MzU3ODIzN2UzNw.jpg"
							/>
							<CardTitle
								title="Rachel C. Lo"
								subtitle="Hong Kong"
							/>
							<CardText>
								Client Service Executive at Lily Jet (Hong Kong)
							</CardText>
						</Card>
					</div>
					<div>
						<Card className="carouselCardSeed">
							<CardMedia className="cardImage"
								aspectRatio="square"
								image="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAkTAAAAJDgxZTJjYzI0LWM5ZWYtNGM3NC05MTY5LTY4MDg1MDcxZWRiMw.jpg"
							/>
							<CardTitle
								title="Hank He"
								subtitle="Canada"
							/>
							<CardText>
								Financial Analyst
							</CardText>
						</Card>
					</div>
				</Slider>
				<div className="signUpButton">
	        <Button onClick={this.handleClick} label="Join Now" icon="person" accent raised />
	      </div>
			</div>
		)
	}
}

export default SeedPeople;
