import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import moment from 'moment';
moment().format();

class AllEvents extends Component {

  render () {
    console.log('Rendering <AllEvent />');

    return (
      <div>
        {this.props.data.allEvent[0] ? (
          <div className="eventsContainer">
            {this.props.data.allEvent.map((dat, i) => {
              return (
                <Card className="eventCard" raised key={i}>
                  <div className="imageDiv">
                    <CardMedia className="cardImage"
                      aspectRatio="square"
                      image={dat.picture_url ? dat.picture_url: "http://i.imgur.com/X9cGCcR.png"}
                    />
                  </div>
                  <div className="centerDiv">
                    <CardTitle className="cardTitle"
                      title={dat.name}
                    />
                    <CardText className="cardDescription">
                      {dat.description}
                    </CardText>
                  </div>
                  <div className="leftDiv">
                    <CardText className="cardTime">
                      <div className="month">
                        {moment(dat.start_time).format('MMM').toUpperCase()}
                      </div>
                      <div className="date">
                        {moment(dat.start_time).format('DD')}
                      </div>
                      TIME:
                      <div>{moment(dat.start_time).format('h:mm a').toUpperCase()} - {moment(dat.end_time).format('h:mm a').toUpperCase()}</div>
                    </CardText>
                    <CardText className="cardVenue">
                      LOCATION:
                      <div>{dat.venue}</div>
                    </CardText>
                    <CardText className="cardHost">
                      HOST:<div> {dat.creator_name}</div>
                    </CardText>
                  </div>
                  <div className="buttonsDiv">
                    <CardActions>
                      <Button className="enterButton" onClick={this.props.addEvent.bind(null, dat.id)} label="Join Event" />
                    </CardActions>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="jumbotron noEvents">
            <h1 className="text-muted">No Events</h1>
          </div>
        )}
      </div>
    )
  }
};

export default AllEvents;
