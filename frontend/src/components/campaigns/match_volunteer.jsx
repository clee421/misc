import React from 'react';
import { Grid, Card, Icon } from 'semantic-ui-react';
import Volunteer from '../volunteers/volunteer';
import Voter from '../voters/voter';

////// CONTAINER /////
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCampaign } from '../../actions/campaign_actions';
import { fetchVoters } from '../../actions/voter_actions';


class CampaignVolunteerMatch extends React.Component {

  componentDidMount() {
    this.props.fetchCampaign(this.props.match.params.campaignId);
    this.props.fetchVoters();
  }

  render() {
    // A loader would go here
    if (this.props.campaign === null) {
      return <p>No campaign yet...</p>;
    }

    // Check for volunteers
    let volunteerList = this.props.campaign.volunteers.map( v => (
      <Volunteer volunteer={v} key={v.id} />
    ));
    if (volunteerList.length === 0) {
      volunteerList = <p>No volunteers!.</p>;
    }

    // Check for voters
    let voterList = this.props.voters.map( v => (
      <Card>
        <Card.Content>
          <Card.Header>
            {v.name}
          </Card.Header>
          <Card.Meta textAlign='left'>
            {`Issues: ${v.issues.join(", ")}`}
          </Card.Meta>
          <Card.Description textAlign='left'>
            <p>{`Age: ${v.age}`}</p>
            <p>{`Phone: ${v.phone}`}</p>
            <p>{`Location: ${v.location}`}</p>
            <p>{`Last Contact: ${v.lastContact}`}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <h2>{`Match: ${97}%`}</h2> 
        </Card.Content>
      </Card>
    ));

    
    return (
      <Grid container>
        <Grid.Row className="campaign">
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Card.Header textAlign='left'>
                  <h3>
                    {this.props.campaign.candidate}
                  </h3>
                </Card.Header>
                <Card.Meta textAlign='left'>
                  {this.props.campaign.state}
                </Card.Meta>
                <Card.Description textAlign='left'>
                  hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae
                </Card.Description>
              </Card.Content>
              <Card.Content textAlign='left' extra>
                <Icon name='users' />
                {`${volunteerList.length} volunteers!`}
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={5}>
            {volunteerList}
          </Grid.Column>
          <Grid.Column width={5}>
            {voterList}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({ campaigns, voters }, ownProps) => {
  const campaignId = ownProps.match.params.campaignId;

  let campaign = null;
  if (campaignId in campaigns) {
    campaign = campaigns[campaignId];
  }

  const voterList = Object.keys(voters).map( voterId => {
    return voters[voterId];
  });

  return {
    campaign,
    voters: voterList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCampaign: (id) => dispatch(fetchCampaign(id)),
    fetchVoters: () => dispatch(fetchVoters())
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignVolunteerMatch));