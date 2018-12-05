/**
 * payments.js
 * Affirm Payments Demo.
 *
 * This modern JavaScript file handles the checkout process using Affirm.
 */

(async () => {
  'use strict';

  // Retrieve the configuration from affirm.
  //const config = await affirm.getConfig();

  // Create references to the main form and ithe submit button.
  const form = document.getElementById('checkout-form');
  const submitButton = form.querySelector('button[type=submit]');

  /**
   * Setup Affirm.
   */

  // Create a Affirm config.
  const affirm_config = {
  public_api_key: "config.publicKey",  /* replace with public api key */
  script:         "https://cdn1-sandbox.affirm.com/js/v2/affirm.js"
  };

  (function(l,g,m,e,a,f,b){var d,c=l[m]||{},h=document.createElement(f),n=document.getElementsByTagName(f)[0],k=function(a,b,c){return function(){a[b]._.push([c,arguments])}};c[e]=k(c,e,"set");d=c[e];c[a]={};c[a]._=[];d._=[];c[a][b]=k(c,a,b);a=0;for(b="set add save post open empty reset on off trigger ready setProduct".split(" ");a<b.length;a++)d[b[a]]=k(c,e,b[a]);a=0;for(b=["get","token","url","items"];a<b.length;a++)d[b[a]]=function(){};h.async=!0;h.src=g[f];n.parentNode.insertBefore(h,n);delete g[f];d(g);l[m]=c})(window,affirm_config,"affirm","checkout","ui","script","ready");

  // Submit handler for our payment form.
  form.addEventListener('submit', async event => {
    event.preventDefault();

    // Retrieve the user information from the form.
    const firstName = form.querySelector('input[name=firstName]').value;
    const lastName = form.querySelector('input[name=lastName]').value;
    const phone = form.querySelector('input[name=phone]').value;
    const email = form.querySelector('input[name=email]').value;
    const country = form.querySelector('select[name=country] option:checked').value;
    const state = form.querySelector('select[name=state] option:checked').value;
 	const address = form.querySelector('input[name=address]').value;
 	const address2 = form.querySelector('input[name=address2]').value;
 	const zip = form.querySelector('input[name=zip]').value;

    // Disable the Pay button to prevent multiple click events.
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';

    console.log("Processing...")
    });

  })();