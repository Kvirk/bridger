import React, { Component } from 'react';

class SectionOne extends Component {

    render () {
        console.log('Rendering <SectionOne />');
        return (
            <section className="header-image">
                <div className="container">
                    <div className="featurette" id="about">
                        <img className="featurette-image img-circle img-responsive pull-right" src="http://www.nowdigitalnetwork.com/wp-content/uploads/2014/05/Demo-Day.jpg" />
                        <h2 className="featurette-heading">This First Heading
                            <span className="text-muted">Will Catch Your Eye</span>
                        </h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                        <p><a href="#" className="btn btn-info">Register</a></p>
                    </div>
                </div>

                <hr className="featurette-divider" />
            </section>
        )
    }
}

export default SectionOne;