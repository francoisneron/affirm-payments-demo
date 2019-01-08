/**
 * server.js
 * Affirm Payment Demo.
 *
 * This is the main file starting the Express server for the demo.
 */

'use strict';

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const fs = require('fs');
const https = require('https');

//const ngrok = require('ngrok')// Receive webhooks over https.
const certOptions = {
  key: fs.readFileSync(path.resolve('cert/server.key')),
  cert: fs.readFileSync(path.resolve('cert/server.crt'))
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Define routes.
app.use('/', require('./routes'));

// Start the server on the correct port.
/*const server = app.listen(config.port, () => {
  console.log(`🚀  Server listening on port ${server.address().port}`);
});*/

const server = https.createServer(certOptions, app);
server.listen(config.port, () => {
  console.log(`🚀  HTTPS Server listening on port ${server.address().port}`);
});


// Turn on the ngrok tunnel in development, which provides both the mandatory HTTPS
// support to consume webhooks locally.
/*if (ngrok) {
	console.log("ngrok init...");
  ngrok.connect(80,
    (err, url) => {
      if (err) {
        if (err.code === 'ECONNREFUSED') {
          console.log(`⚠️  Connection refused at ${err.address}:${err.port}`);
        } else {
          console.log(`⚠️  ${err}`);
        }
        process.exit(1);
      } else {
        console.log(`👩🏻‍💻  Webhook URL: ${url}/webhook`);
        console.log(`💳  App URL to see the demo in your browser: ${url}`);
      }
    }
  );
}*/