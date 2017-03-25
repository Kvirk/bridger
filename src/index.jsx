// Require Stylesheets
require ('./assets/stylesheets/application.scss');

// Render components
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(<App/>, document.getElementById('root'));
