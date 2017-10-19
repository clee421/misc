import React from 'react';

class Volunteer extends React.Component {

  render() {
    let { volunteer } = this.props;
    return (
      <div>
        <p>{`Name: ${volunteer.firstName} ${volunteer.middleName}. ${volunteer.lastName}`}</p>
        <p>{`DOB: ${volunteer.dob}`}</p>
        <p>{`Interests: ${volunteer.interests}`}</p>
      </div>
    );
  }
}

export default Volunteer;