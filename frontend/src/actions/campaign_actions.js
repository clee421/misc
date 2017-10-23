import * as APIUtil from '../util/campaign_api_util';

export const RECEIVE_CAMPAIGNS = 'RECEIVE_CAMPAIGNS';
const receiveCampaigns = (campaigns) => {
  return {
    type: RECEIVE_CAMPAIGNS,
    campaigns
  };
};

export const RECEIVE_CAMPAIGN = 'RECEIVE_CAMPAIGN';
const receiveCampaign = (campaign) => {
  return {
    type: RECEIVE_CAMPAIGN,
    campaign
  };
};

export const fetchCampaigns = () => dispatch => {
  return APIUtil.fetchCampaigns()
  .then(
    resp => dispatch(receiveCampaigns(resp.data))
  )
  .catch( err => console.log(err));
};

export const fetchCampaign = (id) => dispatch => {
  return APIUtil.fetchCampaign(id)
  .then(
    resp => dispatch(receiveCampaign(resp.data))
  )
  .catch( err => console.log(err));
};