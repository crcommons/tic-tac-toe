const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');

const app            = express();

require('./app/routes')(app, {});
// const port = 8000;
// app.listen(port, () => {
//   console.log('We are live on ' + port);
// });

const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});