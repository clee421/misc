import React, { Component } from 'react';
import HeaderNav from './layout/header';
import PageContent from './layout/page_content';

import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderNav />
        <PageContent /> 
      </div>
    );
  }
}

export default App;
