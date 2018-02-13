import * as APIUtil from '../util/voter_api_util';

export const RECEIVE_VOTERS = 'RECEIVE_VOTERS';
const receiveVoters = (voters) => {
  return {
    type: RECEIVE_VOTERS,
    voters
  };
};

export const fetchVoters = () => dispatch => {
  return APIUtil.fetchVoters()
  .then(
    resp => dispatch(receiveVoters(resp.data))
  )
  .catch( err => console.log(err));
};