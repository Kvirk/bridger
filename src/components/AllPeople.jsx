import React, { Component } from 'react';

class AllPeople extends Component {
  
  goToPersonProfile(event) {
    console.log("Entering goToPersonProfile function");
  }

  render () {
    console.log("Rendering <AllPeople />");
    return (
      <div>
        <br />
        <br />
        <br />
        <h1>This is AllPeople Component</h1>
        <h1><a href="#personprofile" onClick={this.goToPersonProfile.bind(this)}>Person 1</a></h1>
        <h1><a href="#personprofile" onClick={this.goToPersonProfile.bind(this)}>Person 2</a></h1>
        <h1><a href="#personprofile" onClick={this.goToPersonProfile.bind(this)}>Person 3</a></h1>
        <hr />
      </div>
    )
  }
}

export default AllPeople;