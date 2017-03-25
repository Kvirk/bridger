import React, { Component } from 'react';
import Intro from './Intro.jsx';
import MyEvents from './MyEvents.jsx';

class MainSection extends Component {

    render () {
        console.log('Rendering <MainSection />');
        return (
            <div className="container">
                <section className="section-one row">
                    <Intro callbackFunction={this.props.callbackFunction}/>
                </section>
                <section className="section-two row">
                    <MyEvents />
                </section>
            </div>
        )
    }
}

export default MainSection;

