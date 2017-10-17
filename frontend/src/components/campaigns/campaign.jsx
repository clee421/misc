import React from 'react';

class Campaign extends React.Component {

  render() {
    return (
      <section>
        <p>{`Candidate: ${this.props.campaign.name}`}</p>
        <p>{`State: ${this.props.campaign.state}`}</p>
      </section>
    );
  }
}

export default Campaign;