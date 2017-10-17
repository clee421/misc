import * as APIUtil from '../util/campaign_api_util';

export const RECEIVE_CAMPAIGNS = 'RECEIVE_CAMPAIGNS';
const receiveCampaigns = (campaigns) => {
  return {
    type: RECEIVE_CAMPAIGNS,
    campaigns
  };
};

export const fetchCampaigns = () => dispatch => {
  return APIUtil.fetchCampaigns()
  .then(
    resp => dispatch(receiveCampaigns(resp.data))
  )
  .catch( err => console.log(err));
};