import React from 'react';
import merge from 'lodash/merge';
import { Form } from 'semantic-ui-react';
import TopicList from '../../helpers/topic_list';

///// CONTAINER /////
import { connect } from 'react-redux';
import { postVolunteer } from '../../actions/campaign_actions';

class VolunteerForm extends React.Component {
  constructor() {
    super();

    const interests = this.createInterests(TopicList);

    this.state = {
      firstName: "",
      midInit: "",
      lastName: "",
      dob: "",
      interests
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  createInterests(interestArray) {
    const interests = {};
    interestArray.forEach( (interest) => {
      interests[interest] = false;
    });

    return interests;
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value
    });
  }

  handleCheck(e) {
    const name = e.currentTarget.name;
    const interests = merge({}, this.state.interests);
    interests[name] = !interests[name];

    this.setState({
      interests
    });
  }

  handleSubmit() {
    // const campaign = merge({}, this.props.campaign);
    const interests = [];
    for (let interest in this.state.interests) {
      if (this.state.interests[interest]) {
        interests.push(interest);
      }
    }

    const volunteer = {
      firstName: this.state.firstName,
      midInit: this.state.midInit,
      lastName: this.state.lastName,
      dob: this.state.dob,
      interests
    };

    // campaign.volunteers.push(volunteer);

    this.props.addVolunteer(volunteer).then(
      resp => {
        const resetInterests = this.createInterests(TopicList);

        this.state = {
          firstName: "",
          midInit: "",
          lastName: "",
          dob: "",
          interests: resetInterests
        };

        this.props.closeForm();
      }
    );
  }
  
  render() {
    const { firstName, midInit, lastName, dob } = this.state;

    // Create list of interests
    const interestList = TopicList.map( (interest, idx) => {
      return <Form.Field 
        key={idx} 
        label={interest}
        name={interest}
        onChange={this.handleCheck}
        control='input' 
        type='checkbox'
        checked={this.state.interests[interest]}/>;
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input 
            onChange={this.handleChange}
            name='firstName' value={firstName}
            required width={6} label='First name' placeholder='John' />
          <Form.Input 
            onChange={this.handleChange}
            name='midInit' value={midInit}
            required width={2} label='MI' placeholder='J' />
          <Form.Input 
            onChange={this.handleChange}
            name='lastName' value={lastName}
            required width={6} label='Last name' placeholder='Doe' />
          <Form.Input 
            onChange={this.handleChange}
            name='dob' value={dob}
            required label='Date of birth' placeholder='10/16/2017' />
        </Form.Group>
        <h3>Interests</h3>
        <Form.Group>
          {interestList}
        </Form.Group>
        <Form.Button content='Submit' />
      </Form>
    );
  }
}

// const mapStateToProps = ({ campaigns }, ownProps) => {
//   return {
//     campaign: campaigns[ownProps.campaignId]
//   };
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addVolunteer: (volunteer) => dispatch(postVolunteer(ownProps.campaignId, volunteer))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(VolunteerForm);