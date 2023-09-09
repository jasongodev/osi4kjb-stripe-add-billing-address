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
var addressStr = "#checkout_offer_extra_contact_information_address";
var addAddress = (billingDetails) => {
  var _a, _b;
  billingDetails.address = {
    postal_code: $(addressStr + "_zip").value,
    city: $(addressStr + "_city").value,
    country: $("#input-address-country").value,
    line1: $(addressStr + "_line_1").value,
    line2: $(addressStr + "_line_2").value === "" ? $(addressStr + "_line_1").value : $(addressStr + "_line_2").value,
    state: (_b = $(addressStr + "_state")) == null ? void 0 : _b.options[(_a = $(addressStr + "_state")) == null ? void 0 : _a.selectedIndex].text
  };
  return billingDetails;
};

// src/index.ts
var patch = () => {
  const originalConstructor = window.App.StripeElementsForm;
  let serializedConstructor = originalConstructor.toString();
  serializedConstructor = serializedConstructor.replace(/billing_details\s*:\s*(.+?)\s*}/g, "billing_details: App.StripeElementsForm.addAddress($1) }");
  const newConstructor = new Function("f", "s", "o", `(${serializedConstructor})(f,s,o)`);
  newConstructor.addAddress = addAddress;
  newConstructor.bindTo = originalConstructor.bindTo;
  newConstructor.prototype = originalConstructor.prototype;
  window.App.StripeElementsForm = newConstructor;
  document.querySelectorAll("[data-stripe-elements-form]").forEach((el) => newConstructor.bindTo(el));
};
var stripeAddBillingAddress = () => {
  var _a, _b, _c;
  const config = Object.assign(
    {
      enabledOffers: "",
      disabledOffers: ""
    },
    (_a = document.currentScript) == null ? void 0 : _a.dataset
  );
  const offerSlug = (_c = (_b = window.location.href.match(/\/offers\/(.{8})/)) == null ? void 0 : _b[1]) != null ? _c : "";
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
    [addressStr + "_zip"]
  );
};
export {
  stripeAddBillingAddress
};
