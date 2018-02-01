// TODO: parameter checking

const ObjectID = require('mongodb').ObjectID;


const voterParams = (req) => {
  return {
    name:         req.name,
    age:          req.age,
    location:     req.location,
    phone:        req.phone,
    lastContact:  req.lastContact
  };
};

module.exports = function(app, db) {
  app.get('/api/voters', (req, res) => {
    db.collection('voters').find({}, (err, voterCursor) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        const voters = [];
        voterCursor.each( (e, item) => {
          if(item === null) {
            res.send(voters);
            return;
          }
          voters.push(item);
        });
      }
    });
  });

  app.get('/api/voters/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('voters').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/api/voters', (req, res) => {
    const voter = voterParams(req);
    db.collection('voters').insert(voter, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/api/voters/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('voters').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });

  app.put('/api/voters/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const voter = voterParams(req);
    db.collection('voters').update(details, voter, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(voter);
      } 
    });
  });
};