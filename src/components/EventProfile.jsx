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
    return (
      <div>
        <header className="header-image">
          <div className="container">
            <div className="featurette" classID="about">
              <h2 className="featurette-heading">{this.props.data.event.name},
                <div className="text-muted">Hello, {this.props.name}!</div>
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
          <hr className="featurette-divider"/>
        </header>
        {this.props.data.users.map((dat, i) => {
          return (
            <div className="container">
              <Card style={{width: '350px'}}>
                  <CardTitle
                    avatar="https://placeimg.com/80/80/animals"
                    title="Avatar style title"
                    subtitle="Subtitle here"
                  />
                  <CardMedia
                    aspectRatio="wide"
                    image="https://placeimg.com/800/450/nature"
                  />
                  <CardTitle
                    title="Title goes here"
                    subtitle="Subtitle here"
                  />
                  <CardText></CardText>
                  <CardActions>
                    <Button label="Action 1" />
                    <Button label="Action 2" />
                  </CardActions>
                </Card>

              <h3 key={i} onClick={this.props.seeProfile.bind(null, dat)}>{dat.first_name}</h3>
            </div>
          )
        })}
        <button onClick={this.props.backToMain}> Back</button>
        <button onClick={this.props.onLogout}> Log Out</button>
      </div>
    )
  }
};

export default EventProfile;