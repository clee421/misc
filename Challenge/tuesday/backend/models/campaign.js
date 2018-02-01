const database = require('../config/db');
const ObjectID = require('mongodb').ObjectID;

exports.list = (resolve, error) => {
  const db = database.getDB();
  db.collection('campaigns').find({}, (err, campaignCursor) => {
    if (err) {
      error(err);
      return;
    } else {
      const campaigns = [];
      campaignCursor.each( (e, item) => {
        if(item === null) {
          resolve(campaigns);
          return;
        }
        campaigns.push(item);
      });
    }
  });
};

exports.find = (id, resolve, error) => {
  const db = database.getDB();
  const details = { '_id': new ObjectID(id) };
  db.collection('campaigns').findOne(details, (err, item) => {
    if (err) {
      error(err);
    } else {
      resolve(item);
    }
  });
};