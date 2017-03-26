import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    console.log("Rendering <Navbar />");
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
                <li>
                        <a href="#about">Events</a>
                    </li>
                    <li>
                        <a href="#services">Login</a>
                    </li>
                    <li>
                        <a onClick={this.props.eventsCreationFunction}>Creation</a>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
    )
  }
}

export default NavBar
