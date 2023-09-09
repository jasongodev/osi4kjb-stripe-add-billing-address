/*! Copyright 2023 Jason Go - Apache-2.0 */

// src/utils.ts
var domReady = (callback, wait = 12e4, objects = [], selectors = []) => {
  const ctrl = setTimeout(() => {
    checkReady = () => {
    };
  }, wait);
  let checkReady = () => {
    if (document.readyState.length > 7 && objects.every((key) => Object.hasOwn(window, key)) && selectors.every((selector) => document.querySelector(selector))) {
      clearInterval(ctrl);
      callback();
    } else {
      setTimeout(checkReady, 9);
    }
  };
  checkReady();
};
var $ = (s) => {
  return document.querySelector(s);
};

// src/addAddress.ts
var addAddress = (billingDetails) => {
  var _a3, _b2;
  billingDetails.address = {
    postal_code: $("#checkout_offer_extra_contact_information_address_zip").value,
    city: $("#checkout_offer_extra_contact_information_address_city").value,
    country: $("#input-address-country").value,
    line1: $("#checkout_offer_extra_contact_information_address_line_1").value,
    line2: $("#checkout_offer_extra_contact_information_address_line_2").value === "" ? $("#checkout_offer_extra_contact_information_address_line_1").value : $("#checkout_offer_extra_contact_information_address_line_2").value,
    state: (_b2 = $("#checkout_offer_extra_contact_information_address_state")) == null ? void 0 : _b2.options[(_a3 = $("#checkout_offer_extra_contact_information_address_state")) == null ? void 0 : _a3.selectedIndex].text
  };
  return billingDetails;
};

// src/index.ts
addAddress({});
var _a;
var config = Object.assign(
  {
    enabledOffers: "",
    disabledOffers: ""
  },
  (_a = document.currentScript) == null ? void 0 : _a.dataset
);
var _a2, _b;
var offerSlug = (_b = (_a2 = window.location.href.match(/\/offers\/(.{8})/)) == null ? void 0 : _a2[1]) != null ? _b : "";
var patch = () => {
  let serializedConstructor = window.App.StripeElementsForm.toString();
  const serializedBindTo = window.App.StripeElementsForm.bindTo.toString();
  serializedConstructor = serializedConstructor.replace(/billing_details\s*:\s*(.+?)\s*}/g, "billing_details: addAddress($1) }");
  window.App.StripeElementsForm = new Function("f", "s", "o", `(${serializedConstructor})(f,s,o)`);
  window.App.StripeElementsForm.bindTo = new Function("e", `(${serializedBindTo})(e)`);
  document.querySelectorAll("[data-stripe-elements-form]").forEach((el) => window.App.StripeElementsForm.bindTo(el));
};
var stripeAddBillingAddress = () => {
  if (
    // Not a checkout page
    offerSlug === "" || // Or included in disabled offers
    config.disabledOffers.split(/\s*[,|]\s*/).includes(offerSlug) || // Or not included in enabled offers
    config.enabledOffers !== "" && !config.enabledOffers.split(/\s*[,|]\s*/).includes(offerSlug)
  ) {
    return;
  }
  domReady(
    // Run the patched code
    patch,
    // But limit waiting for 10 seconds...
    1e4,
    // For these objects to exist before running the patched code
    ["$", "App", "Stripe"],
    // And run only when address fields are present
    ["#checkout_offer_extra_contact_information_address_zip"]
  );
};
export {
  stripeAddBillingAddress
};
