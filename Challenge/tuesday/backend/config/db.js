const MongoClient = require('mongodb').MongoClient;
const async = require('async');

const state = {
  db: null,
  mode: null,
};

const DEVELOPMENT_URI = 'mongodb://tuesday_admin:challenge_1016@ds121495.mlab.com:21495/tuesday_campaign';
const TEST_URI = 'mongodb://tuesday_admin:challenge_1016@ds111336.mlab.com:11336/tuesday_test';

exports.MODE_TEST = 'mode_test';
exports.MODE_DEVELOPMENT = 'mode_development';

exports.connect = function(mode, done) {
  if (state.db) return done();

  var uri = mode === exports.MODE_TEST ? TEST_URI : DEVELOPMENT_URI;

  MongoClient.connect(uri, function(err, db) {
    if (err) return done();
    state.db = db;
    state.mode = mode;
    done();
  });
};

exports.getDB = function() {
  return state.db;
};


exports.drop = function(done) {
  if (!state.db) return done();
  // This is faster then dropping the database
  state.db.collections(function(err, collections) {
    async.each(collections, function(collection, cb) {
      if (collection.collectionName.indexOf('system') === 0) {
        return cb();
      }
      collection.remove(cb);
    }, done);
  });
};

exports.fixtures = function(data, done) {
  var db = state.db;
  if (!db) {
    return done(new Error('Missing database connection.'));
  }

  var names = Object.keys(data.collections);
  async.each(names, function(name, cb) {
    db.createCollection(name, function(err, collection) {
      if (err) return cb(err);
      collection.insert(data.collections[name], cb);
    });
  }, done);
};