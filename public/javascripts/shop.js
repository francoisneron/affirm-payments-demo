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

  // Pay the specified order by sending a checkout token alongside it.
  async chargeOrder(token) {
    try {
      const response = await fetch(`/charges`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(token),
      });
      const data = await response.json();
      if (data.error) {
        return {error: data.error};
      } else {
        return data;
      }
    } catch (err) {
      return {error: err.message};
    }
  }

 }

 window.shop = new Shop();