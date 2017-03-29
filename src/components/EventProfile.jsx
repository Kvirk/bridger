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
        <header className="header-image">
          <div className="container">
            <div className="featurette" classID="about">
              <h2 className="featurette-heading">{this.props.data.event.name},
                <div className="text-muted">Hello, {this.props.name}!</div>
                  {this.props.data.users.map((dat, i) => {
                    return (
                      <div className="col-lg-15 .col-xs-15 .col-sm-15 .col-md-15">
                        <div className="center-block">
                          <Card style={{width: '225px'}}>
                            <CardTitle/>
                            <CardMedia
                              aspectRatio="square"
                              image="https://placeimg.com/800/450/nature"
                            />
                            <CardTitle
                              key={i}
                              onClick={this.props.seeProfile.bind(null, dat)}
                              title={dat.first_name}
                              subtitle="Subtitle here"
                            />
                            <CardText></CardText>
                            <CardActions>
                              <Button label="Action 1" />
                              <Button label="Action 2" />
                            </CardActions>
                          </Card>
                        </div>
                      </div>
                    )
                  })}
              <hr className="featurette-divider"/>
              </h2>
              <p className="lead text-muted">
                Bridged helps you reach your full potential by connecting you with the right people.
              </p>
              <p className="lead text-muted">
                Loation: {this.props.data.event.venue}
              </p>
              <p className="lead text-muted">
                Start Time: {dateStart.toString()}
              </p>
              <p className="lead text-muted">
                Start Time: {dateEnd.toString()}
              </p>
            </div>
          </div>
          <Button  icon='back' onClick={this.props.backToMain} raised />
          <Button  icon='logout'onClick={this.props.onLogout} raised/>
          <hr className="featurette-divider"/>
        </header>
      </div>
    )
  }
};

export default EventProfile;