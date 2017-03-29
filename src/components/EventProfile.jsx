import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';

class EventProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }


   render() {
    let dateStart = new Date(this.props.data.event.start_time)
    let dateEnd = new Date(this.props.data.event.end_time)
    let length = this.props.data.users.length
    return (
      <div className="event-profile-container">
        <p>this.props.data.event</p>
        <header className="header-image">
          <div className="container">
            <div className="featurette" classID="about">
              <h2 className="featurette-heading">{this.props.data.event.name.toUpperCase()}</h2>
                <div className="container">
                  {this.props.data.users.map((dat, i) => {
                    return (
                      <div className="col-lg-15" key={i}>
                        <div className="center-block">
                          <Card style={{width: '215px'}}>
                            <CardTitle/>
                            <CardMedia
                              aspectRatio="square"
                              image= { dat.picture_url ? dat.picture_url : "http://vignette2.wikia.nocookie.net/filthy-frank/images/c/ce/Question-mark-face.jpg/revision/latest?cb=20160909100759"}
                            />
                            <CardTitle
                              title={dat.first_name + " " + dat.last_name}
                              subtitle="Subtitle here"
                            />
                            <CardText></CardText>
                            <CardActions>
                              <Button label="Contact" onClick={this.props.seeProfile.bind(null, dat)} raised/>
                            </CardActions>
                          </Card>
                        </div>
                      </div>
                    )
                  })}
                </div>
              <hr className="featurette-divider"/>


              <div className='col-sm-4'>
                <p className="lead text-muted"> Venue:</p>
                <p className="lead text-muted"> Starting Time:</p>
                <p className="lead text-muted"> End Time:</p>
              </div>
              <div className='col-sm-6'>
                <p className="lead text-muted">{this.props.data.event.venue}</p>
                <p className="lead text-muted">Start Time: {new Date(dateStart).toString().split(' ').slice(0, 5).join(' ')}</p>
                <p className="lead text-muted">End Time: {new Date(dateEnd).toString().split(' ').slice(0, 5).join(' ')}</p>
              </div>
            </div>
          </div>
          <Button label='back' onClick={this.props.backToMain} raised />
          <hr className="featurette-divider"/>
        </header>
      </div>
    )
  }
};

export default EventProfile;
