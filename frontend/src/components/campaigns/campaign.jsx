import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Image, Icon } from 'semantic-ui-react';
import Volunteer from '../volunteers/volunteer';
import DefaultImage from '../../assets/images/default.jpg';

import '../../css/campaign.css';

class Campaign extends React.Component {

  render() {
    const volunteerList = this.props.campaign.volunteers.map( v => (
      <Volunteer volunteer={v} key={v.id} />
    ));

    return (
      <Grid.Row className="campaign">
        <Grid.Column width={6}>
          <Link to={`/campaigns/${this.props.campaign._id}`} >
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
                <Icon name='users' />
                {`${volunteerList.length} volunteers!`}
              </Card.Content>
            </Card>
          </Link>
        </Grid.Column>
        <Grid.Column width={6}>
          {volunteerList}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default Campaign;