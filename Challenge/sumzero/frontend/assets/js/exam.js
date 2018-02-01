import '../css/normalize.css'; // Normalize CSS styles across browsers
import '../css/exam.css'; // Place your exam CSS in this file

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});