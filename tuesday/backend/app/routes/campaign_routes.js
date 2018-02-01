const ObjectID = require('mongodb').ObjectID;

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

module.exports = function(app, db) {
  app.get('/api/campaigns', (req, res) => {
    db.collection('campaigns').find({}, (err, campaignCursor) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        const campaigns = [];
        campaignCursor.each( (e, item) => {
          if(item === null) {
            res.send(campaigns);
            return;
          }
          campaigns.push(item);
        });
      }
    });
  });
  
  app.get('/api/campaigns/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('campaigns').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/api/campaigns', (req, res) => {
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