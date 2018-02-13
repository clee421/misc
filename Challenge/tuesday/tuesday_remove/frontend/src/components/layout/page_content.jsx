import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CampaignsList from '../campaigns/campaigns_list';
import VotersList from '../voters/voters_list';
import MatchVolunteer from '../campaigns/match_volunteer';

import '../../css/layout.css';

export default () => {
  return (
    <div className='page-content'>
      <Switch>
        <Route path="/campaigns/:campaignId" component={MatchVolunteer} />
        <Route path="/campaigns" component={CampaignsList} />
        <Route path="/voters" component={VotersList} />
        <Route path="/" component={() => <Redirect to="/campaigns" />} />
      </Switch>
    </div>
  );
};