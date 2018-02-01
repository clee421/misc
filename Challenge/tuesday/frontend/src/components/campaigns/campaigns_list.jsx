import React from 'react';
import { Grid } from 'semantic-ui-react';
import Campaign from './campaign';

////////// CONTAINER //////////
import { connect } from 'react-redux';
import { fetchCampaigns } from '../../actions/campaign_actions';

class CampaignsList extends React.Component {

  componentDidMount() {
    this.props.fetchCampaigns();
  }

  render() {
    const campaignList = this.props.campaigns.map( campaign => {
      return <Campaign campaign={campaign} key={campaign._id} />;
    });
    return (
      <Grid container>
        {campaignList}
      </Grid>
    );
  }
}

////////// CONTAINER //////////
const mapStateToProps = ({ campaigns }) => {
  const campaignList = Object.keys(campaigns).map( campId => {
    return campaigns[campId];
  });
  return {
    campaigns: campaignList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCampaigns: () => dispatch(fetchCampaigns())
  };
};

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CampaignsList);