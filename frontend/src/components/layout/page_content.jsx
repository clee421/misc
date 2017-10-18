import React from 'react';
import CampaignsList from '../campaigns/campaigns_list';
import Volunteer from '../volunteers/volunteer';
import Voter from '../voters/voter';

import '../../css/layout.css';

export default () => {
  return (
    <div className='page-content'>
      <CampaignsList />
      <Volunteer />
      <Voter />
    </div>
  );
};