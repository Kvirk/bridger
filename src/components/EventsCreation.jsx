import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';

class EventsCreation extends Component {
 constructor(props) {
   super(props);
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.state = { name: '',
                 description: '',
                 venue: '',
                 start: '',
                 end: ''
               };
 }

  handleChange(name, value) {
    let data = this.state;
    data[name] = value;
    this.setState(data);
  };

 handleSubmit(event){
   event.preventDefault();
   let formInput = {};
   formInput['name'] = this.state.name;
   formInput['description'] = this.state.description;
   formInput['venue'] = this.state.venue;
   formInput['start'] = this.state.start;
   formInput['end'] = this.state.end;
   this.props.handleForm(formInput);
 }

 render() {
   return (
     <section className="eventsCreationContainer">
     <h1></h1>
     <h1></h1>
         <Input type='text' onChange={this.handleChange.bind(this, 'name')} label='Event' name='name' />
         <Input type="text" onChange={this.handleChange.bind(this, 'description')} label='Description' name="description" />
         <Input type="text" onChange={this.handleChange.bind(this, 'venue')} label='Venue' name="venue" />
         <Input type="Datetime-local" onChange={this.handleChange.bind(this, 'start')} label='Start Time' name="start-time" />
         <Input type="Datetime-local" onChange={this.handleChange.bind(this, 'end')} label='End Time' name="end-time" />
         <Input type="submit" value="Submit" onClick={this.handleSubmit}/>
     </section>
   )
 }
};

export default EventsCreation;