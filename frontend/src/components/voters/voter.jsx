import React from 'react';

class Voter extends React.Component {

  render() {
    return (
      <div>
        <p>{`Name: ${this.props.voter.name}`}</p>
        <p>{`Age: ${this.props.voter.age}`}</p>
        <p>{`Location: ${this.props.voter.location}`}</p>
        <p>{`Phone: ${this.props.voter.phone}`}</p>
        <p>{`Last Contact: ${this.props.voter.lastContact}`}</p>
      </div>
    );
  }
}

export default Voter;