import React from 'react';
import { Form } from 'semantic-ui-react';
import TopicList from '../../helpers/topic_list';

class VolunteerForm extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      midInit: "",
      lastName: "",
      dob: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    alert('submit pressed');
  }
  
  render() {
    const { firstName, midInit, lastName, dob } = this.state;

    // Create list of interests
    const interestList = TopicList.map( (interest, idx) => {
      return <Form.Field key={idx} label={interest} control='input' type='checkbox' />;
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

export default VolunteerForm;