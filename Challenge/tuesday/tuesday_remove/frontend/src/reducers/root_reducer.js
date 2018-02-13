import campaignReducer from './campaigns_reducer';
import voterReducer from './voters_reducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers ({
  campaigns: campaignReducer,
  voters: voterReducer,
});

export default rootReducer;