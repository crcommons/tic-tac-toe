const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');

const app            = express();

require('./app/routes')(app, {});
const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});