const voterRoutes = require('./voter');
const campaignRoutes = require('./campaign');

module.exports = function(app, db) {
  voterRoutes(app, db);
  campaignRoutes(app, db);
};