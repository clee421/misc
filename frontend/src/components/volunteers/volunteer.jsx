import React from 'react';
import { Card } from 'semantic-ui-react';

class Volunteer extends React.Component {

  render() {
    let { volunteer } = this.props;
    return (
      <Card
        onClick={this.props.onClick}
        header={`${volunteer.firstName} ${volunteer.middleName}. ${volunteer.lastName}`}
        meta={`Date of birth: ${volunteer.dob}`}
        description={volunteer.interests.join(', ')}
      />
    );
  }
}

export default Volunteer;