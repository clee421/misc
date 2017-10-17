import React from 'react';
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
      return <Campaign campaig={campaign} key={campaign._id} />;
    });
    return (
      <section>
        {campaignList}
      </section>
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