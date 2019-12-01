//Install express server
const express = require('express');
const app = express();
const path = require('path');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/'));

// load index.html first
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

// Start the app by listening on the default Heroku port or set to 0 and OS will pick random port;
let listener = app.listen(process.env.PORT || 0, () => {
  console.log(`listening on http://localhost:${listener.address().port}`);
});

