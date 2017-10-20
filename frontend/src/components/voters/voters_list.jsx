import React from 'react';
import Voter from './voter';
import { Grid } from 'semantic-ui-react';

////////// CONTAINER //////////
import { connect } from 'react-redux';
import { fetchVoters } from '../../actions/voter_actions';

class VotersList extends React.Component {

  componentDidMount() {
    this.props.fetchVoters();
  }

  render() {
    const voterList = this.props.voters.map( voter => {
      return <Voter voter={voter} key={voter._id} />;
    });
    return (
      <Grid container>
        <Grid.Row>
          <Grid.Column width={12}>
            {voterList}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

////////// CONTAINER //////////
const mapStateToProps = ({ voters }) => {
  const voterList = Object.keys(voters).map( voterId => {
    return voters[voterId];
  });
  return {
    voters: voterList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVoters: () => dispatch(fetchVoters())
  };
};

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(VotersList);