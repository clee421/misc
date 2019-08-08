import { combineReducers } from 'redux';
import users from './user-reducer';
import characters from './character-reducer';

const rootReducer = combineReducers({
  users,
  characters,
});

export default rootReducer;