import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

class AllPeople extends Component {
	constructor(props) {
		super(props);
		this.state = { search: '' };
		this.search = this.search.bind(this);
	}

  search(value) {
    this.setState({search: value});
  };

	render () {
		console.log("Rendering <AllPeople />");

		let check = new RegExp(this.state.search, 'i');
		let result = this.props.data.allUsers.map((dat, i) => {
				if (check.test(dat.first_name) || check.test(dat.last_name)
				|| check.test(dat.headline) || check.test(dat.location) || check.test(dat.industry)
				|| check.test(dat.position_company_name) || check.test(dat.position_company_title)
				|| check.test(dat.summary)) {
				return (
					<div key={i}>
						<Card className="allPeopleCard">
							<CardMedia
								aspectRatio="square"
								image= { dat.picture_url ? dat.picture_url : "http://vignette2.wikia.nocookie.net/filthy-frank/images/c/ce/Question-mark-face.jpg/revision/latest?cb=20160909100759" }
							/>
							<CardTitle
								title={dat.first_name + " " + dat.last_name}
								subtitle={dat.location}
							/>
							<CardText>
								{dat.headline}
							</CardText>
							<CardActions>
								<Button icon="person" className="connectButton" onClick={this.props.seeProfile.bind(null, dat)} />
							</CardActions>
						</Card>
					</div>
				)
			} else {
				return null;
			}
		})
		result =  result.filter(function(value){
			if (value === null){
				return false;
			}
			else {
				return true;
			}
		})

		console.log(result)
		return (
			<div className="allPeopleContainer">
				<div className="searchContainer">
					<Input type='text' className='searchInput' onChange={this.search} label='Search' icon='search' value={this.state.search} />
				</div>
				<div className="allPeopleCardsContainer">
					{result[0] ? (result) : (
						<div key={1}>
							<Card>
								<CardTitle
									title={'No Matches'}
								/>
							</Card>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default AllPeople;
