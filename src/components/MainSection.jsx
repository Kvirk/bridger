import React, { Component } from 'react';
import Intro from './Intro.jsx';
import AllEvents from './AllEvents.jsx';
import EventProfile from './EventProfile.jsx';

class MainSection extends Component {

    render () {
        
        let topSectionPartial;
        let additionalPartial;
        let bottomSectionPartial;
        switch (this.props.urlPath) {
            case 'loggedin':
                console.log("Section, logged in state");
                // topSectionPartial = <MyEvents />;
                bottomSectionPartial = <AllEvents />;
                break;
            case 'event':
                console.log("Section, event state");
                topSectionPartial = <EventProfile />;
                // additionalPartial = <Schedule />;
                additionalPartial = <h1>Mid section</h1>;
                bottomSectionPartial = <h1>Bottom section</h1>;
                break;

            // Default case is 'home'
            default:
                console.log("Section, home state");
                topSectionPartial = <Intro callbackFunction={this.props.callbackFunction} />;
                bottomSectionPartial = <AllEvents />;
        }

        console.log('Rendering <MainSection />');
        return (
            <div className="container">
                <section className="top-section row">
                    {topSectionPartial}
                </section>
                <section className="mid-section row">
                    {additionalPartial}
                </section>   
                <section className="bottom-section row">
                    {bottomSectionPartial}
                </section>
            </div>
        )
    }
}

export default MainSection;

