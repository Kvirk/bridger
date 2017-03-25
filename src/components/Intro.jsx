import React, { Component } from 'react';

class Intro extends Component {

    render () {
        console.log('Rendering <Intro />');
        return (
            <section className="header-image">
                <div className="featurette">
                    <img className="col-xs-12 col-md-6 featurette-image img-circle img-fluid text-center" src="http://www.nowdigitalnetwork.com/wp-content/uploads/2014/05/Demo-Day.jpg" />
                    <div className="col-xs-12 col-md-6 text-center">
                        <h2 className="featurette-heading">
                            Welcome to Bridge!
                            <br />
                            <span className="text-muted">We help you meet people you need to talk to</span>
                        </h2>
                        <p><a href="#" className="btn btn-info">Register</a></p>
                    </div>
                </div>

                <hr className="featurette-divider" />

            </section>
        )
    }
}

export default Intro;