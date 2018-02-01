const should    = require('should');
const DB        = require('../config/db');
const fixtures  = require('./fixtures/campaign');

const Campaign = require('../models/campaign');

describe('Model Campaign Tests', function() {

  before(function(done) {
    DB.connect(DB.MODE_TEST, done);
  });

  beforeEach(function(done) {
    DB.drop(function(err) {
      if (err) return done(err);
      DB.fixtures(fixtures, done);
    });
  });

  it('list should fetch all campaigns', function(done) {
    Campaign.list(
      function(campaigns) {
        campaigns.length.should.eql(2);
        campaigns[0].candidate.should.eql("Dummy 1");
        campaigns[1].candidate.should.eql("Dummy 2");
        done();
      }
    );
  });

  it('find should fetch campaign by id', function(done) {
    Campaign.list(
      function(campaigns) {
        const id = campaigns[0]._id;
        Campaign.find(
          id,
          function(campaign) {
            campaign.candidate.should.eql("Dummy 1");
            campaign.state.should.eql("NA");
            campaign.volunteers.length.should.eql(2);
            done();
          }
        );
      }
    );
  });
});
