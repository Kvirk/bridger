import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import Dropzone from 'react-dropzone';
import request  from 'superagent';
import { Button } from 'react-toolbox/lib/button';

class EventsCreation extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.state = { image: true, name: '', imageName: '', description: '', venue: '', startDate: '', startTime: '', endDate: '', endTime: '', file: null };
	}

	onDrop(acceptedFiles) {
    this.setState({
       file: acceptedFiles[0],
       image: false,
       imageName: acceptedFiles[0].name
   	})
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


	handleSubmit(event){
		event.preventDefault();
		let formInput = {};
		if(this.state.file !== null){
			var req = request.post('/upload');
			req.attach(this.state.file.name, this.state.file);
			req.end(function(good, err){
				console.log(good);
			});
		}
		formInput['name'] = this.state.name;
		formInput['imageName'] =this.state.imageName;
		formInput['description'] = this.state.description;
		formInput['filename'] = this.state.filename;
		formInput['venue'] = this.state.venue;
		formInput['start'] = new Date(this.state.startDate + ' ' + this.state.startTime);
		formInput['end'] = new Date(this.state.endDate + ' ' + this.state.endTime);
		this.props.handleForm(formInput);
	}

	render() {
		return (
			<section className="eventsCreationContainer">
				<Dropzone className='dropzone' ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
            <div>{ this.state.image ? 'Upload or drag event image (Square size)' : 'Image uploaded'}</div>
        </Dropzone>
				<Input type='text' onChange={this.handleChange.bind(this, 'name')} label='Event' icon='event' name='name' value={this.state.name} />
				<Input type="text" onChange={this.handleChange.bind(this, 'description')} label='Description' icon='subject' name="description" value={this.state.description} multiline />
				<Input type="text" onChange={this.handleChange.bind(this, 'venue')} label='Venue' icon='room' name="venue" value={this.state.venue} />
        <DatePicker inputClassName='datePicker' label='Start Date' autoOk sundayFirstDayOfWeek onChange={this.handleChange.bind(this, 'startDateTemp')} value={this.state.startDateTemp} />
        <TimePicker inputClassName='timePicker' label='Start Time' onChange={this.handleChange.bind(this, 'startTimeTemp')} value={this.state.startTimeTemp} format='ampm' />
        <DatePicker inputClassName='datePicker' label='End Date' autoOk sundayFirstDayOfWeek onChange={this.handleChange.bind(this, 'endDateTemp')} value={this.state.endDateTemp} />
        <TimePicker inputClassName='timePicker' label='End Time' onChange={this.handleChange.bind(this, 'endTimeTemp')} value={this.state.endTimeTemp} format='ampm' />
				<Button className="backButton" icon="arrow_back" label="Back" onClick={this.props.backToMain} />
				{(this.state.name !== '') && (this.state.description !== '') && (this.state.venue !== '') &&
					<Button className="createButton" icon="event_available" label="Create Event" onClick={this.handleSubmit} primary raised />}
				<iframe name="votar" className='hack'></iframe>
			</section>
		)
	}
};

export default EventsCreation;
