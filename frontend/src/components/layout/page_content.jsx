import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CampaignsList from '../campaigns/campaigns_list';
import VotersList from '../voters/voters_list';

import '../../css/layout.css';

export default () => {
  return (
    <div className='page-content'>
      <Switch>
        <Route path="/campaigns" component={CampaignsList} />
        <Route path="/voters" component={VotersList} />
        <Route path="/" component={() => <Redirect to="/campaigns" />} />
      </Switch>
    </div>
  );
};