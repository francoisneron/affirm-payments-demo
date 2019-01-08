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

    // Global variable hack for unsupported Promises with Affirm.
    let token;

    //var checkout_mode = "modal";

    /**
     * Setup Affirm.
     */

    // Create a Affirm config.
    const affirm_config = {
        public_api_key: "D61DY07EIUOBE2I8",
        /* replace with public api key */
        script: "https://cdn1-sandbox.affirm.com/js/v2/affirm.js"
    };

    (function(l, g, m, e, a, f, b) { var d, c = l[m] || {},
            h = document.createElement(f),
            n = document.getElementsByTagName(f)[0],
            k = function(a, b, c) { return function() { a[b]._.push([c, arguments]) } };
        c[e] = k(c, e, "set");
        d = c[e];
        c[a] = {};
        c[a]._ = [];
        d._ = [];
        c[a][b] = k(c, a, b);
        a = 0; for (b = "set add save post open empty reset on off trigger ready setProduct".split(" "); a < b.length; a++) d[b[a]] = k(c, e, b[a]);
        a = 0; for (b = ["get", "token", "url", "items"]; a < b.length; a++) d[b[a]] = function() {};
        h.async = !0;
        h.src = g[f];
        n.parentNode.insertBefore(h, n);
        delete g[f];
        d(g);
        l[m] = c })(window, affirm_config, "affirm", "checkout", "ui", "script", "ready");

    /* Hack since Promise not supported on Affirm. */
	async function waitForToken(){
	    if(typeof token !== "undefined"){
	        submitButton.textContent = 'Charging...' + token;
			const response = await shop.chargeOrder(token);
			console.log(JSON.stringify(response));
	    }
	    else{
	        setTimeout(waitForToken, 250);
	    }
	}

	//wait for Affirm UI to be ready
	affirm.ui.ready(function(){
	    //define the Prequal JSON object
	    var affirm_prequal_config = {
		    "page_type": 	"home",
		    "mode": 	 	"modal"
	    };
	    //set the Prequal configuration
	    affirm.prequal.set(affirm_prequal_config);
	});	

    // Submit handler for our payment form.
    form.addEventListener('submit', async event => {
        event.preventDefault();

        // Retrieve the user information from the form.
        const firstName = form.querySelector('input[name=firstName]').value;
        const lastName = form.querySelector('input[name=lastName]').value;
        const phone = form.querySelector('input[name=phone]').value;
        const email = form.querySelector('input[name=email]').value;
        const city = form.querySelector('input[name=city]').value;
        const country = form.querySelector('select[name=country] option:checked').value;
        const state = form.querySelector('select[name=state] option:checked').value;
        const address = form.querySelector('input[name=address]').value;
        const address2 = form.querySelector('input[name=address2]').value;
        const zip = form.querySelector('input[name=zip]').value;

        // Disable the Pay button to prevent multiple click events.
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';

        /**
         * Setup Affirm checkout values.
         */
        affirm.checkout({

            "config": {
                "financial_product_key": "OXI1Z8JD2JG3X6F3", //replace with your Affirm financial product key
            },

            "merchant": {
                "user_cancel_url": "https://https://localhost:8000/", //TODO: Create listener for webhook on the server side.
                "user_confirmation_url": "https://localhost:8000/webhook",
                "user_confirmation_url_action": "POST"
            },

            //shipping contact
            "shipping": {
                "name": {
                    "first": firstName,
                    "last": lastName
                    // You can also include the full name
                    // "full" : "John Doe"
                },
                "address": {
                    "line1": address,
                    "line2": address2,
                    "city": city,
                    "state": state,
                    "zipcode": zip
                },
                "email": email,
                "phone_number": phone
            },

            // dummy cart 
            "items": [{
                "display_name": "Acme SLR-NG",
                "sku": "ACME-SLR-NG-01",
                "unit_price": 300000,
                "qty": 1,
                "item_image_url": "https://examplemerchant.com/static/item.png",
                "item_url": "https://examplemerchant.com/acme-slr-ng-01.htm",
            }],

            "metadata": {
                "mode": "modal"
            },
            // dummy pricing / charge amount
            "currency": "USD",
            "discounts": {
                "savemoney123": {
                    "discount_amount": 500
                }
            },
            "tax_amount": 199,
            "shipping_amount": 399,
            "total": 300598
        });

        console.log("Processing...")

        affirm.checkout.open({
		    onFail: function(){
		    	console.log("User cancelled the Affirm checkout flow");
		    },
		    onSuccess: function(res){
		    	console.log("Affirm checkout successful, checkout token is:  " + JSON.stringify(res));
		    	token = res;
		    }
	    });    	

        waitForToken(token);

	    submitButton.textContent = 'Done...';

    });
})();