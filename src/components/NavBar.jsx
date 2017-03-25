import React, { Component } from 'react';

class NavBar extends Component {
    goToEvent(event) {
        console.log("Entering goToEvent function");
        this.props.goToEventHandler();
    }

    goHome(event) {
        console.log("Going back home");
        this.props.goHomeHandler();
    }
    
    render () {
        console.log("Rendering <Navbar />");

        // Changing content of partial depending on the state type (i.e. current URL path)
        let partial;
        switch (this.props.pageType) {
            /*case 'testEvent':
                console.log("This is testEvent state");
                partial = 
                    <div>
                        <li> 
                            <a href="#test" onClick={this.goToEvent.bind(this)}>On testEvent State</a> 
                        </li>
                        <li> 
                            <a href="#test" onClick={this.goToEvent.bind(this)}>Just Appeared Text</a> 
                        </li>
                        <li>
                            <a href="#home" onClick={this.goHome.bind(this)}>Home</a>
                        </li>
                    </div>
                break;*/
            case 'event':
                console.log("In event state");
                partial =
                    <span>
                        <li>
                            <a href="#home" onClick={this.goHome.bind(this)}>Home</a>
                        </li>
                        <li>
                            <a href="#attendees">Suggested People</a>
                        </li>
                        <li>
                            <a href="#events">Upcoming Events</a>
                        </li>
                    </span>
            default:
                console.log("This is default (home page)");
                partial = 
                    <div>
                        {/*<li>
                            <a href="#test" onClick={this.goToEvent.bind(this)}>TEST GO TO EVENT</a>
                        </li>*/}
                        <li>
                            <a href="#events">Events</a>
                        </li>
                        <li>
                            <a href="#services">Login</a>
                        </li>
                    </div>
        }

        return (
        <nav className="navbar navbar-fixed-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">
                        <img alt="Brand" src="http://www.free-icons-download.net/images/abstract-tree-icon-69924.png" />
                        Bridge
                    </a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav center">
                        {/*<li>
                            <a href="#test" onClick={this.goToEvent.bind(this)}>TEST GO TO EVENT</a>
                        </li>
                        <li>
                            <a href="#events">Events</a>
                        </li>
                        <li>
                            <a href="#services">Login</a>
                        </li>*/}
                        {partial}
                    </ul>
                </div>
            </div>
        </nav>
        )
    }
}

export default NavBar
