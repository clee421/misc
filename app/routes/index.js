const voterRoutes = require('./voter_routes');
const campaignRoutes = require('./campaign_routes');

module.exports = function(app, db) {
  voterRoutes(app, db);
  campaignRoutes(app, db);
};