import React from 'react';
import { Grid, Card, Icon, Button, Modal } from 'semantic-ui-react';
import Volunteer from '../volunteers/volunteer';
import VolunteerForm from '../volunteers/volunteer_form';
import merge from 'lodash/merge';

////// CONTAINER /////
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCampaign } from '../../actions/campaign_actions';
import { fetchVoters } from '../../actions/voter_actions';


class CampaignVolunteerMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVolunteer: null
    };
  }

  selectVolunteer(volunteer) {
    const currentVolunteer = merge({}, volunteer);
    this.setState({
      currentVolunteer
    });
  }

  getMatchPercentage(volunteer, voter) {
    if (volunteer === null) return 0;
    let match = 0;
    voter.issues.forEach( issue => {
      if (volunteer.interests.includes(issue)) {
        match++;
      }
    });
    const total = voter.issues.length;
    return Math.round((match / total) * 100);
  }

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
    let volunteerList = this.props.campaign.volunteers.map( v => {
      let color = null;
      if (this.state.currentVolunteer !== null && v.id === this.state.currentVolunteer.id) {
        color = "red";
      }
      return (
        <Volunteer
          color={color}
          onClick={() => this.selectVolunteer(v)}
          volunteer={v} key={v.id} />
      );
    });
    if (volunteerList.length === 0) {
      volunteerList = <p>No volunteers!.</p>;
    }

    // Check for voters
    let voterList = this.props.voters.map( v => {
      const match = this.getMatchPercentage(this.state.currentVolunteer, v);
      return (
        <Card key={v._id}>
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
            <h2>{`Match: ${match}%`}</h2> 
          </Card.Content>
        </Card>
      );
    });

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
            <Modal
              closeIcon
              closeOnRootNodeClick={false}
              trigger={<Button><Icon name='plus' />volunteer</Button>}>
              <Modal.Header>Enter volunteer information</Modal.Header>
              <Modal.Content>
                <VolunteerForm />
              </Modal.Content>
            </Modal>
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