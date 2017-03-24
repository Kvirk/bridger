import React, { Component } from 'react';

class LinkedinLogin extends Component {
    constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
    componentDidMount() {
        var liRoot = document.createElement('div');
        liRoot.id = 'linkedin-root';

        document.body.appendChild(liRoot);

        (function(d, s, id) {
            const element = d.getElementsByTagName(s)[0];
            const ljs = element;
            var js = element;
            if (d.getElementById(id)) {
                return; }
            js = d.createElement(s);
            js.id = id;
            js.src = '//platform.linkedin.com/in.js';
            js.text = 'api_key: 86ihm2bra9vjg3';
            ljs.parentNode.insertBefore(js, ljs);
        }(document, 'script', 'linkedin-sdk'));
    }

    handleClick(e) {
        e.preventDefault();
        IN.User.authorize(this.props.callbackFunction, '');
    }

    render() {
        return (
            <div>
            <button onClick={this.handleClick}> Test Me</button>
            </div>
        );
    }
}
export default LinkedinLogin;