/**
 * routes.js
 * Affirm Payments Demo.
 */

'use strict';

const config = require('./config');
const express = require('express');
const request = require("request");
const router = express.Router();
const privateKey = process.env.AFFIRM_PUBLIC_KEY + ":" + process.env.AFFIRM_PRIVATE_KEY;

// Render the main app HTML.
router.get('/', (req, res) => {
  res.render('index.html');
});

/**
 * Expose the Affirm public key and other pieces of config via an endpoint.
 */  
router.get('/config', (req, res) => {
  res.json({
    affirmPublicKey: config.affirm.publicKey,
    affirmFinancialProduct: config.affirm.financialProduct
  });
});

// Render the main app HTML.
router.post('/webhook', (req, res) => {
  console.log("test 2")
  console.log(req.body);

});

router.get('/dashboard', (req, res) => {
  res.render('dashboard.html');
});

router.post('/charges', (req, res) => {
	console.log(privateKey);
	console.log(req);
	console.log(req.body);
	console.log(req.body.checkout_token);
	var headers = {
		'Authorization': 'Basic ' + new Buffer(privateKey).toString("base64"),
		'Content-Type': 'application/json'
	};

	var options = {
		url: "https://sandbox.affirm.com/api/v2/charges",
		method: "post",
		headers: headers,
		body: {
			checkout_token: req.body.checkout_token,
		},
		json: true
	};

	request(options, function (err, response, body) {
		if (err) {
			console.log("Error sending charges");
			console.log(err, response, body);
			res.status(500).send(err);
		}else {
			console.log(response.body);
			res.send(body);
		}
	});
});

router.post('/charges/:id/capture', (req, res) => {
  res.render('dashboard.html');
});

router.post('/charges/:id/void', (req, res) => {
  res.render('dashboard.html');
});

router.post('/charges/:id/refund', (req, res) => {
  res.render('dashboard.html');
});

router.post('/charges/:id/update', (req, res) => {
  res.render('dashboard.html');
});

router.get('/checkout/:id', (req, res) => {
  res.render('dashboard.html');
});

router.get('/charges/:id', (req, res) => {
  res.render('dashboard.html');
});

module.exports = router;