import React, { Component } from 'react';

import Campaign from './campaign';
import Volunteer from './volunteer';
import Voter from './voter';

import logo from '../logo.svg';
import '../css/app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Campaign />
        <Volunteer />
        <Voter />
      </div>
    );
  }
}

export default App;
