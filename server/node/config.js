/**
 * config.js
 * Affirm Payment Demo.
 */

'use strict';

// Load environment variables from the `.env` file.
require('dotenv').config();

module.exports = {

  // Configuration for Affirm.
  // API Keys: https://www.affirm.com/dashboard/#/apikeys
  affirm: {
    // Use your test keys for development and live keys for real charges in production.
    // For non-card payments like iDEAL, live keys will redirect to real banking sites.
    publicKey: process.env.AFFIRM_PUBLIC_KEY,
    privateKey: process.env.AFFIRM_PRIVATE_KEY,
  },

  // Server port.
  port: process.env.PORT || 8000,
};