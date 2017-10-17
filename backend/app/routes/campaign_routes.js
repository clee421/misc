const ObjectID = require('mongodb').ObjectID;

const campaignParams = (req) => {
  return {
    candidate:    req.candidate,
    state:        req.state,
    volunteers:   req.volunteers
  };
};

module.exports = function(app, db) {
  app.get('/campaigns', (req, res) => {
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

  app.get('/campaigns/:id', (req, res) => {
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

  app.post('/campaigns', (req, res) => {
    const voter = campaignParams(req);
    db.collection('campaigns').insert(voter, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/campaigns/:id', (req, res) => {
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

  app.put('/campaigns/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const voter = campaignParams(req);
    db.collection('campaigns').update(details, voter, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(voter);
      } 
    });
  });
};