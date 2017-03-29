import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import { Button } from 'react-toolbox/lib/button';

class EventsCreation extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = { name: '', description: '', venue: '', startDate: '', startTime: '', endDate: '', endTime: '', active: false };
	}

	 handleChange(name, value) {
		 let data = this.state;
		 if (name === 'startDateTemp' || name === 'endDateTemp') {
		 	data[name] = value;
		 	name = name.slice(0, -4);
		 	value = value.toString().split(' ').slice(1, 4).join(' ');
		 }
		 else if (name === 'startTimeTemp' || name === 'endTimeTemp') {
		 	data[name] = value;
		 	name = name.slice(0, -4);
		 	value = value.toString().split(' ').slice(4, 5).join(' ');
		 }
		 data[name] = value;
		 this.setState(data);
	 };

  handleToggle() {
    this.setState({active: !this.state.active});
  };

	handleSubmit(event){
		event.preventDefault();
		let formInput = {};
		formInput['name'] = this.state.name;
		formInput['description'] = this.state.description;
		formInput['venue'] = this.state.venue;
		formInput['start'] = new Date(this.state.startDate + ' ' + this.state.startTime);
		formInput['end'] = new Date(this.state.endDate + ' ' + this.state.endTime);
		this.props.handleForm(formInput);
	}

	render() {
		return (
			<section className="eventsCreationContainer">
				<Input type='text' onChange={this.handleChange.bind(this, 'name')} label='Event' name='name' value={this.state.name} />
				<Input type="text" onChange={this.handleChange.bind(this, 'description')} label='Description' name="description" value={this.state.description} />
				<Input type="text" onChange={this.handleChange.bind(this, 'venue')} label='Venue' name="venue" value={this.state.venue} />
        <DatePicker inputClassName='datePicker' label='Start Date' autoOk sundayFirstDayOfWeek onChange={this.handleChange.bind(this, 'startDateTemp')} value={this.state.startDateTemp} />
        <TimePicker inputClassName='timePicker' label='Start Time' active={this.state.active} onChange={this.handleChange.bind(this, 'startTimeTemp')} value={this.state.startTimeTemp} />
        <DatePicker inputClassName='datePicker' label='End Date' autoOk sundayFirstDayOfWeek onChange={this.handleChange.bind(this, 'endDateTemp')} value={this.state.endDateTemp} />
        <TimePicker inputClassName='timePicker' label='End Time' active={this.state.active} onChange={this.handleChange.bind(this, 'endTimeTemp')} value={this.state.endTimeTemp} />
				<Button label="Create Event" onClick={this.handleSubmit} primary raised />
				<Button label="Back" onClick={this.props.backToMain} raised />
			</section>
		)
	}
};

export default EventsCreation;
