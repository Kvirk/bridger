import React, { Component } from 'react';

class Footer extends Component {
	constructor(props) {
		super(props);
		this.scrollUp = this.scrollUp.bind(this);
	}

  scrollUp() {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    if (top > 0) {
        window.scrollTo(0, top - 40)
        setTimeout(this.scrollUp, 0)
    }
	}

	render () {
		console.log("Rendering <Navbar />");

	return (
		<div className='footer'>
			<hr/>
			<img className="footer-image" src="http://i.imgur.com/X9cGCcR.png" onClick={this.scrollUp} />
      <div className="toTheTop">TOP OF PAGE</div>
		</div>
		)
	}
}

export default Footer;
