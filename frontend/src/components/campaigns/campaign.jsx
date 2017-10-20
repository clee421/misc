import React from 'react';
import { Grid, Card, Icon } from 'semantic-ui-react';
import Volunteer from '../volunteers/volunteer';
import DefaultImage from '../../assets/images/default.jpg';

class Campaign extends React.Component {

  render() {
    const volunteerList = this.props.campaign.volunteers.map( (v, idx) => (
      <Volunteer volunteer={v} key={idx} />
    ));

    const extra = (
      <a>
        <Icon name='users' />
        {`${volunteerList.length} volunteers!`}
      </a>
    );

    return (
      <Grid.Row>
        <Grid.Column width={6}>
          <Card
            image={DefaultImage}
            header={this.props.campaign.candidate}
            meta={this.props.campaign.state}
            description='hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae'
            extra={extra}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          {volunteerList}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default Campaign;