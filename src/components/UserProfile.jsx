import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
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
		let image = this.props.data.picture_url ? this.props.data.picture_url : "http://vignette2.wikia.nocookie.net/filthy-frank/images/c/ce/Question-mark-face.jpg/revision/latest?cb=20160909100759"

		return (
			<div className='userProfileContainer'>
				<Card className="profileCard" raised>
					<CardMedia
						aspectRatio="square"
						image={image}
					/>
					<CardTitle
						title={this.props.data.first_name + ' ' + this.props.data.last_name}
						subtitle={this.props.data.location}
					/>
					{this.props.data.headline && (
						<CardText>
							Headline: {this.props.data.headline}
						</CardText>
					)}
					{this.props.data.headline && (
						<CardText>
							Industry: {this.props.data.industry}
						</CardText>
					)}
					{this.props.data.headline && (
						<CardText>
							Summary: {this.props.data.summary}
						</CardText>
					)}
					{this.props.data.positions !== 0 && (
						<CardText>
							Currently: {this.props.data.position_company_name[0]}
						</CardText>
					)}
					<CardActions>
						<Button className='learnMoreButton' href={this.props.data.public_profile_url} label='LinkedIn' icon='person' raised primary />
		        <Button className="backButton" onClick={this.props.backToEP.bind(null, this.props.data.event_id)} label='Back' />
					</CardActions>
				</Card>
				<Card className="chatCard">
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
					<Input className="chatInput" onKeyPress={this.submit} type='text' label='Message' name='message' value={this.state.message} onChange={this.handleChange.bind(this, 'message')} />
				</Card>
			</div>
		)
  }
};

export default UserProfile;
