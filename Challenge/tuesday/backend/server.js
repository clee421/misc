const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

const db             = require('./config/db');
const routes         = require('./app/routes');

const port = 8000;

// body-parser extract the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let mode = db.MODE_DEVELOPMENT;
if (process.env.NODE_ENV === 'test') {
  mode = db.MODE_TEST;
}

db.connect(mode, () => {

  routes(app);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});