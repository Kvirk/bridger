import React, { Component } from 'react';
import Welcome from './Welcome.jsx';
import AllEvents from './AllEvents.jsx';
import MyEvents from './MyEvents.jsx';
import EventProfile from './EventProfile.jsx';
import AllPeople from './AllPeople.jsx';
import PersonProfile from './PersonProfile.jsx';

class MainSection extends Component {

    render () {
        
        let topSectionPartial;
        let additionalPartial;
        let bottomSectionPartial;
        switch (this.props.urlPath) {
            case 'loggedin':
                console.log("Section, logged in state");
                topSectionPartial = <MyEvents />;
                bottomSectionPartial = <AllEvents />;
                break;
            case 'event':
                console.log("Section, event state");
                topSectionPartial = <MyEvents />;
                // additionalPartial = <Schedule />;
                // additionalPartial = <h1>Mid section</h1>;
                bottomSectionPartial = <AllEvents />;
                break;

            // Default case is 'home'
            default:
                console.log("Section, home state");
                topSectionPartial = <Welcome callbackFunction={this.props.callbackFunction} />;
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

