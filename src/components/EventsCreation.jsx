import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';

class EventsCreation extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    let formInput = {};
    formInput['name'] = this.refs.name.value;
    this.refs.name.value = '';
    formInput['description'] = this.refs.description.value;
    this.refs.description.value = '';
    formInput['venue'] = this.refs.venue.value;
    this.refs.venue.value = '';
    formInput['start'] = this.refs.start.value;
    this.refs.start.value = '';
    formInput['end'] = this.refs.end.value;
    this.refs.end.value = '';
    this.props.handleForm(formInput)
  }

  render() {
    return (
      <section className="eventsCreationContainer">
        <form onSubmit={this.handleSubmit}>
          <Input type='text' ref='name' label='Event' name='name' />
          <Input type="text" ref='description' label='Description' name="description" />
          <Input type="text" ref='venue' label='Venue' name="venue" />
          <Input type="Datetime-local" ref='start' label='Start Time' name="start-time" />
          <Input type="Datetime-local" ref='end' label='End Time' name="end-time" />
          <Input type="submit" value="Submit" />
        </form>
      </section>

      // <div>
      //   <h1>Hello, I am creating an event</h1>
      //     <form onSubmit={this.handleSubmit}>
      //       <label>Event:
      //         <input type="text" ref='name' name="name" />
      //       </label>
      //       <label>Description:
      //         <input type="text" ref='description' name="description" />
      //       </label>
      //       <label>Venue:
      //         <input type="text" ref='venue' name="venue" />
      //       </label>
      //       <label>Start Time:
      //         <input type="text" ref='start' name="start-time" type="Datetime-local"/>
      //       </label>
      //       <label>End Time:
      //         <input type="text" ref='end' name="end-time" type="Datetime-local"/>
      //       </label>
      //       <input type="submit" value="Submit"/>
      //     </form>
      // </div>
    )
  }
};

export default EventsCreation;
