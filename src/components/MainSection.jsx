import React, { Component } from 'react';
import Intro from './Intro.jsx';
import MyEvents from './MyEvents.jsx';
import EventProfile from './EventProfile.jsx';

class MainSection extends Component {

    render () {
        
        let topSectionPartial;
        let bottomSectionPartial;
        switch (this.props.pageType) {
            case 'event':
                console.log("Section, event state");
                topSectionPartial = <EventProfile />;
                bottomSectionPartial = <h1>Bottom</h1>;
                break;

            // Default case is 'home'
            default:
                console.log("Section, home state");
                topSectionPartial = <Intro callbackFunction={this.props.callbackFunction} />;
                bottomSectionPartial = <MyEvents />;
        }

        console.log('Rendering <MainSection />');
        return (
            <div className="container">
                <section className="top-section row">
                    {/*<Intro callbackFunction={this.props.callbackFunction}/>*/}
                    {topSectionPartial}
                </section>
                <section className="bottom-section row">
                    {/*<MyEvents />*/}
                    {bottomSectionPartial}
                </section>
            </div>
        )
    }
}

export default MainSection;

