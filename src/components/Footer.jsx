import React, { Component } from 'react';
class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    console.log("Rendering <Navbar />");

    return (
      <div>
        <hr className='footer'/>
        <img className="footer-image" src="http://i.imgur.com/X9cGCcR.png" />
      </div>
    )
  }
}

export default Footer