import merge from 'lodash/merge';
import { 
  RECEIVE_CAMPAIGNS,
  RECEIVE_CAMPAIGN } from '../actions/campaign_actions';

const CampaignReducer = (state = {}, action) => {
  Object.freeze(state);
  let currentState = merge({}, state);

  switch (action.type) {
    case RECEIVE_CAMPAIGNS:
      const campaigns = {};
      action.campaigns.forEach( campaign => {
        campaigns[campaign._id] = campaign;
      });

      return merge(currentState, campaigns);

    case RECEIVE_CAMPAIGN:
      currentState[action.campaign._id] = action.campaign;

      return currentState;

    default:
      return state;
  }
};

export default CampaignReducer;