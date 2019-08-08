import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers/root-reducer';

export default (preloadedState = {}) => {
  const middlewares = [thunk];

  // Only have the logger in development
  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');
    middlewares.push(createLogger());
  }

  return (
    createStore(
      rootReducer,
      preloadedState,
      applyMiddleware( ...middlewares )
    )
  );
};