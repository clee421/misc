import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Root from './components/root';
import configureStore from './store/store';

import './css/index.css';



document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');

  let store = configureStore();

  ReactDOM.render(<Root store={store}/>, rootEl);
});
registerServiceWorker();