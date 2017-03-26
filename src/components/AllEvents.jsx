import React, { Component } from 'react';
import Slider from 'react-slick';

class AllEvents extends Component {

	render () {
		console.log('Rendering <MyEvent />');
		var settings = {
      dots: true,
      slidesToShow: 3
    };
		return (
			<div className="carousel">
				<Slider {...settings}>
	        <div>1</div>
	        <div>2</div>
	        <div>3</div>
	        <div>4</div>
	        <div>5</div>
	        <div>6</div>
	      </Slider>
	    </div>
		)
	}
}

export default AllEvents;
