import React from 'react';
import ReactDOM from 'react-dom';

// Internal Imports
import Root from './components/root';
import configureStore from './store/store';
import registerServiceWorker from 'registerServiceWorker';

// CSS
import './index.css';
import 'semantic-ui-css/semantic.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  ReactDOM.render(<Root store={store} />, root);
});
registerServiceWorker();