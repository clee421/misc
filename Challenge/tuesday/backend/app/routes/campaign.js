const database = require('../../config/db');
const ObjectID = require('mongodb').ObjectID;
const Campaign = require('../../models/campaign');

const campaignParams = (req) => {
  return {
    candidate:    req.candidate,
    state:        req.state,
    volunteers:   req.volunteers
  };
};

const volunteerParams = (body) => {
  return {
    firstName:  body.firstName,
    middleName:  body.midInit,
    lastName:  body.lastName,
    dob:  body.dob,
    interests:  body.interests
  };
};

const addIdToVolunteer = (campaign, volunteer) => {
  if (campaign.volunteers.length < 1) {
    volunteer["id"] = 1;
    return volunteer;
  }

  const lastVolunteer = campaign.volunteers[campaign.volunteers.length - 1];
  volunteer["id"] = lastVolunteer.id + 1;
  return volunteer;
};

module.exports = function(app) {
  app.get('/api/campaigns', (req, res) => {
    Campaign.list(
      (campaigns) => res.send(campaigns),
      (err) => res.send({'error':'An error has occurred'})
    );
  });
  
  app.get('/api/campaigns/:id', (req, res) => {
    const id = req.params.id;
    Campaign.find(
      id,
      campaign => res.send(campaign),
      err => res.send({'error':'An error has occurred'})
    );
  });

  app.post('/api/campaigns', (req, res) => {
    const db = database.getDB();
    const campaign = campaignParams(req);
    db.collection('campaigns').insert(campaign, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  
  app.post('/api/campaigns/:campaignId/volunteers', (req, res) => {

    const db = database.getDB();
    const campaignId = req.params.campaignId;
    const details = { '_id': new ObjectID(campaignId) };
    let volunteer = volunteerParams(req.body);
    db.collection('campaigns').findOne(details, (err, campaign) => {
  
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
    
        volunteer = addIdToVolunteer(campaign, volunteer);
        campaign.volunteers.push(volunteer);
    
        db.collection('campaigns').update(details, campaign, (error, result) => {
          if (error) {
            res.send({'error':'An error has occurred'});
          } else {
        
            res.send(campaign);
          } 
        });
      }
    });
  });

  app.delete('/api/campaigns/:id', (req, res) => {
    const db = database.getDB();
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('campaigns').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });

  app.put('/api/campaigns/:id', (req, res) => {
    const db = database.getDB();
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const campaign = campaignParams(req);
    db.collection('campaigns').update(details, campaign, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(campaign);
      } 
    });
  });
};