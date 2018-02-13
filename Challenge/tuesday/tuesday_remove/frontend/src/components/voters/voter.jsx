import React from 'react';
import { Card } from 'semantic-ui-react';

class Voter extends React.Component {

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {this.props.voter.name}
          </Card.Header>
          <Card.Meta textAlign='left'>
            {`Issues: education, economics, international`}
          </Card.Meta>
          <Card.Description textAlign='left'>
            <p>{`Age: ${this.props.voter.age}`}</p>
            <p>{`Phone: ${this.props.voter.phone}`}</p>
            <p>{`Location: ${this.props.voter.location}`}</p>
            <p>{`Last Contact: ${this.props.voter.lastContact}`}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default Voter;