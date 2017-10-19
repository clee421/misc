import React from 'react';
import CampaignsList from '../campaigns/campaigns_list';
import Voter from '../voters/voter';

import '../../css/layout.css';

export default () => {
  return (
    <div className='page-content'>
      <CampaignsList />
      <Voter />
    </div>
  );
};