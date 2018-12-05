/**
 * shop.js
 * Affirm Payments Demo.
 */

class Shop {
 // Retrieve the configuration from the API.
  async getConfig() {
    try {
      const response = await fetch('/config');
      const config = await response.json();
      return config;
    } catch (err) {
      return {error: err.message};
    }
  }
 }

 window.shop = new Shop();