const voterRoutes = require('./voter_routes');

module.exports = function(app, db) {
  voterRoutes(app, db);
};