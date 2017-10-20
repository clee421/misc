import merge from 'lodash/merge';
import { RECEIVE_VOTERS } from '../actions/voter_actions';

const VoterReducer = (state = {}, action) => {
  Object.freeze(state);
  let currentState = merge({}, state);

  switch (action.type) {
    case RECEIVE_VOTERS:
      const voters = {};
      action.voters.forEach( voter => {
        voters[voter._id] = voter;
      });

      return merge(currentState, voters);

    default:
      return state;
  }
};

export default VoterReducer;