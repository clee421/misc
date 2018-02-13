const voterRoutes = require('./voter_routes');
const campaignRoutes = require('./campaign_routes');

module.exports = function(app, db) {
  app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  voterRoutes(app, db);
  campaignRoutes(app, db);
};