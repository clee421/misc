import React from 'react';
import { Grid } from 'semantic-ui-react';
import Campaign from './campaign';

////// CONTAINER /////
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCampaign } from '../../actions/campaign_actions';

class CampaignVolunteerMatch extends React.Component {

  componentDidMount() {
    this.props.fetchCampaign(this.props.match.params.campaignId);
  }

  render() {
    // A loader would go here
    if (this.props.campaign === null) {
      return <p>No campaign yet...</p>;
    }


    return (
      <Grid container>
        <Campaign campaign={this.props.campaign} />
      </Grid>
    );
  }
}

const mapStateToProps = ({ campaigns }, ownProps) => {
  const campaignId = ownProps.match.params.campaignId;

  let campaign = null;
  if (campaignId in campaigns) {
    campaign = campaigns[campaignId];
  }

  return {
    campaign
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCampaign: (id) => dispatch(fetchCampaign(id))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignVolunteerMatch));