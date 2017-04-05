import React, { Component } from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Dotdotdot from 'react-dotdotdot'
import moment from 'moment';
moment().format();


class AllPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {search: ''};
    this.search = this.search.bind(this);
  }

  goToPersonProfile(event) {
    console.log("Entering goToPersonProfile function");
    this.props.goToPersonProfileHandler();
  }

  search(event) {
    this.setState({search: event.target.value});
  }

  render () {
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
    } else {
      settings.slidesToShow = 5;
    }

    console.log("Rendering <AllPeople />");

    let check = new RegExp(this.state.search, 'i');

    let result = this.props.data.allUsers.map((dat, i) => {
        if (check.test(dat.first_name) || check.test(dat.last_name)
        || check.test(dat.headline) || check.test(dat.location) || check.test(dat.industry)
        || check.test(dat.position_company_name) || check.test(dat.position_company_title)
        || check.test(dat.summary)) {
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
                <Button label="Connect" className="connectButton" onClick={this.props.seeProfile.bind(null, dat)} primary raised />
              </CardActions>
            </Card>
          </div>
        )
      } else {
        return null;
      }
    })
    result =  result.filter(function(value){
      if (value === null){
        return false;
      }
      else {
        return true;
      }
    })

    console.log(result)
    return (
      <div>
        <h4 className="featurette-heading whatIsIt">All People:</h4>
          <div className="carousel">
            <Slider {...settings}>
              {result[0] ? (result) :
                (
                  <div key={1}>
                    <Card className="carouselCardSeed">
                      <CardTitle
                        title={'No Matches'}
                      />
                    </Card>
                  </div>
                )
              }
            </Slider>
            <p>Search:</p>
            <input type="text" className="form-control" onChange={this.search}/>
          </div>
      </div>
    )
  }
}

export default AllPeople;
