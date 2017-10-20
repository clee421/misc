import React from 'react';
import { Grid, Card, Image, Icon } from 'semantic-ui-react';
import Volunteer from '../volunteers/volunteer';
import DefaultImage from '../../assets/images/default.jpg';

class Campaign extends React.Component {

  render() {
    const volunteerList = this.props.campaign.volunteers.map( (v, idx) => (
      <Volunteer volunteer={v} key={idx} />
    ));

    return (
      <Grid.Row>
        <Grid.Column width={6}>
          <Card>
          <Image src={DefaultImage} />
          <Card.Content>
            <Card.Header textAlign='left'>
              <h3>
                {this.props.campaign.candidate}
              </h3>
            </Card.Header>
            <Card.Meta textAlign='left'>
              {this.props.campaign.state}
            </Card.Meta>
            <Card.Description textAlign='left'>
              hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae
            </Card.Description>
          </Card.Content>
          <Card.Content textAlign='left' extra>
            <a>
              <Icon name='users' />
              {`${volunteerList.length} volunteers!`}
            </a>
          </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={6}>
          {volunteerList}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default Campaign;