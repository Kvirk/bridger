import React, { Component } from 'react';
import { List, ListSubHeader, ListItem } from 'react-toolbox/lib/list';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import Avatar from 'react-toolbox/lib/avatar';

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = { message: '' };
	}

	componentDidMount() {
	}

	handleChange(name, message){
		this.setState({message});
	};

	submit(key) {
		if (key.charCode === 13) {
			this.setState({message: ''})
			return this.props.sendMessage(`${this.props.name}: ${this.state.message}`, this.props.data.linkedin_id);
		}
	}

	render() {
		return (
			<div className='userProfile' >
				<div className="jumbotron">
							<Avatar><img src={this.props.data.picture_url}/></Avatar>
					<h1 className="display-3">{this.props.data.first_name} {this.props.data.last_name} - {this.props.data.location}</h1>
					<p className="lead">{this.props.data.headline}</p>
					<p>{this.props.data.company} {this.props.data.industry}</p>
					<p className="lead">
						<a className="btn btn-primary btn-lg" href={this.props.data.public_profile_url} role="button">Learn more</a>
					</p>
				</div>
				<Button onClick={this.props.backToEP.bind(null, this.props.data.event_id)} label='Back' raised />
				<List selectable ripple>
					<ListSubHeader caption='Chat Below!' />
						{this.props.data.message.map((dat, i) => {
							let nameMatch = dat.match(/^(.*?):/i)
							let crop = 0;
							let name = 'System';
							let picture = this.props.data.picture_url;
							if (nameMatch){
								name = nameMatch[0].slice(0, -1)
								crop = nameMatch[0].length + 1;
								if (this.props.name === name) {
									picture = this.props.picture;
								}
							}
							if (name === 'System') {
								picture = `https://babbleon5.files.wordpress.com/2009/08/james_cameron01.jpg`;
							}
						 return <ListItem key = {i} avatar={picture} caption={name} legend={dat.slice(crop)} />
						})}
				</List>
				<Input onKeyPress={this.submit} type='text' label='Message' name='message' value={this.state.message} onChange={this.handleChange.bind(this, 'message')} />
			</div>
		)
  }
};

export default UserProfile;
