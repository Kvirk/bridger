import React, { Component } from 'react';

class Intro extends Component {

    render () {
        console.log('Rendering <Intro />');
        return (
            <section className="header-image">
                <div className="featurette">
                    <img className="col-sm-12 featurette-image img-circle img-fluid pull-right" src="http://www.nowdigitalnetwork.com/wp-content/uploads/2014/05/Demo-Day.jpg" />
                    <h2 className="featurette-heading">
                        Welcome to Bridge!
                        <br />
                        <span className="text-muted">We help you meet people you need to talk to</span>
                    </h2>
                    
                    <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    <p><a href="#" className="btn btn-info">Register</a></p>
                </div>

                <hr className="featurette-divider" />
      
            </section>
        )
    }
}

export default Intro;