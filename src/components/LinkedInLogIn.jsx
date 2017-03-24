var React = require('react');

var LinkedinLogin = React.createClass({

    componentDidMount: function() {
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
    },

    callbackFunction: function() {
        // IN.API.Profile("me")
        // .fields([
        //     "firstName","lastName","headline","positions:(company,title,summary,startDate,endDate,isCurrent)","industry",
        //     "location:(name,country:(code))","pictureUrl","publicProfileUrl","emailAddress",
        //     "educations","dateOfBirth"])
        // .result(function(results) {
        //     console.log(results);
        //     console.log("test")
        // });
        function onSuccess(data) {
            console.log(data);
            console.log(data.location);
            console.log(data.positions);
        }

        // Handle an error response from the API call
        function onError(error) {
            console.log(error);
        }

        // Use the API call wrapper to request the member's basic profile data

        IN.API.Raw("/people/~:(id,first-name,last-name,location,positions,industry,specialties,summary)?format=json").result(onSuccess).error(onError);
    },

    handleClick: function(e) {
        e.preventDefault();
        IN.User.authorize(this.callbackFunction, '');
    },

    render: function() {
        return (
            <div>
            <button onClick={this.handleClick}> Test Me</button>
            </div>
        );
    }
});
module.exports = LinkedinLogin;