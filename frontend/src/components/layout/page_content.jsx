import React from 'react';
import CampaignsList from '../campaigns/campaigns_list';
import VotersList from '../voters/voters_list';

import '../../css/layout.css';

export default () => {
  return (
    <div className='page-content'>
      <CampaignsList />
      <VotersList />
    </div>
  );
};