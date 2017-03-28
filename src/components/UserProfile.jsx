import React, { Component } from 'react';
import {List, ListSubHeader, ListItem} from 'react-toolbox/lib/list';
import Input from 'react-toolbox/lib/input';

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
     <div>
       <h1>Hello, {this.props.name}!</h1>
       <button onClick={this.props.onLogout}> Log Out</button>
       <h3>{this.props.data.first_name}</h3>
       <h3>{this.props.data.last_name}</h3>
       <h3>{this.props.data.headline}</h3>
       <h3>{this.props.data.company}</h3>
       <h3>{this.props.data.industry}</h3>
       <h3>{this.props.data.location}</h3>
       <button onClick={this.props.backToEP.bind(null, this.props.data.event_id)}> Back</button>
       <List selectable ripple>
        <ListSubHeader caption='Chat Below!' />
           {this.props.data.message.map((dat, i) => {
              let nameMatch = dat.match(/^(.*?):/i)
              let crop = 0;
              let name = 'System'
              if(nameMatch){
                name = nameMatch[0].slice(0, -1)
                crop = nameMatch[0].length + 1;
              }

               return <ListItem key = {i}
                          avatar='https://images.pexels.com/photos/9291/nature-bird-flying-red.jpg?w=1260&h=750&auto=compress&cs=tinysrgb'
                          caption={name}
                          legend={dat.slice(crop)}
                        />
           })}
      </List>
      <Input onKeyPress={this.submit} type='text' label='Message' name='message' value={this.state.message} onChange={this.handleChange.bind(this, 'message')} />
      </div>
   )
 }
};

export default UserProfile;
