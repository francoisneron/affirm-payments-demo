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

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../../public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Start the server on the correct port.
const server = app.listen(config.port, () => {
  console.log(`🚀  Server listening on port ${server.address().port}`);
});