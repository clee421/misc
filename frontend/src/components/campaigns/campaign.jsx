import React from 'react';
import Volunteer from '../volunteers/volunteer';

class Campaign extends React.Component {

  render() {
    const volunteerList = this.props.campaign.volunteers.map( (v, idx) => (
      <Volunteer volunteer={v} key={idx} />
    ));

    return (
      <section>
        <p>{`Candidate: ${this.props.campaign.candidate}`}</p>
        <p>{`State: ${this.props.campaign.state}`}</p>
        {volunteerList}
      </section>
    );
  }
}

export default Campaign;