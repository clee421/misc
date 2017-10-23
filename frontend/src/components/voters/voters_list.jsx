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
    const { voters } = this.props;
    const numColumns = 3;

    let columnCount = 0;
    let voterRow = [];
    const voterList = [];
    for (let i = 0; i < voters.length; i++) {
      if (columnCount >= numColumns) {
        voterList.push(
          <Grid.Row columns={numColumns} key={voterList.length} >
            {voterRow}
          </Grid.Row>
        );
        voterRow = [];
        columnCount = 0;
      }

      if (columnCount < numColumns) {
        voterRow.push(
          <Grid.Column key={voters[i]._id} >
            <Voter voter={voters[i]} />
          </Grid.Column>
        );
        columnCount++;
      }
    }

    // If there is anything left inside voterRow
    if (voterRow.length > 0) {
      voterList.push(
        <Grid.Row columns={numColumns} key={voterList.length} >
          {voterRow}
        </Grid.Row>
      );
    }

    return (
      <Grid container>
        {voterList}
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