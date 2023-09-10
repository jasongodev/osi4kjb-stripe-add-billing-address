/*! Copyright 2023 Jason Go - Apache-2.0 */

// src/utils.ts
var doc = document;
var $ = (s) => {
  return doc.querySelector(s);
};
var domReady = (callback, wait = 12e4, objects = [], selectors = []) => {
  const ctrl = setTimeout(() => {
    checkReady = () => {
    };
  }, wait);
  let checkReady = () => {
    if (doc.readyState.length > 7 && objects.every((key) => Object.hasOwn(window, key)) && selectors.every((selector) => $(selector))) {
      clearInterval(ctrl);
      callback();
    } else {
      setTimeout(checkReady, 9);
    }
  };
  checkReady();
};

// src/addAddress.ts
var addressStr = "#checkout_offer_extra_contact_information_address";
var addAddress = (billingDetails) => {
  var _a, _b;
  const value = "value";
  billingDetails.address = {
    postal_code: $(addressStr + "_zip")[value],
    city: $(addressStr + "_city")[value],
    country: $("#input-address-country")[value],
    line1: $(addressStr + "_line_1")[value],
    line2: $(addressStr + "_line_2")[value] === "" ? $(addressStr + "_line_1")[value] : $(addressStr + "_line_2")[value],
    state: (_b = $(addressStr + "_state")) == null ? void 0 : _b.options[(_a = $(addressStr + "_state")) == null ? void 0 : _a.selectedIndex].text
  };
  return billingDetails;
};

// src/index.ts
var patch = (app = window.App) => {
  const originalConstructor = app.StripeElementsForm;
  let serializedConstructor = originalConstructor.toString();
  serializedConstructor = serializedConstructor.replace(/{\s*b(.+?)s\s*:\s*(.+?)\s*}/g, "{b$1s:App.SABA($2)}");
  const newConstructor = new Function("f", "s", "o", `(${serializedConstructor})(f,s,o)`);
  newConstructor.bindTo = originalConstructor.bindTo;
  newConstructor.prototype = originalConstructor.prototype;
  app.StripeElementsForm = newConstructor;
  app.SABA = addAddress;
  doc.querySelectorAll("[data-stripe-elements-form]").forEach((el) => newConstructor.bindTo(el));
};
var stripeAddBillingAddress = () => {
  var _a, _b;
  const offerSlug = (_a = window.location.href.match(/\/offers\/(.{8})/)) == null ? void 0 : _a[1];
  const separator = /\s*[,|]\s*/;
  const enabledOffers = "enabledOffers";
  const disabledOffers = "disabledOffers";
  const config = Object.assign(
    {
      [enabledOffers]: "",
      [disabledOffers]: ""
    },
    (_b = doc.currentScript) == null ? void 0 : _b.dataset
  );
  if (
    // Not a checkout page
    offerSlug === void 0 || // Or included in disabled offers
    config[disabledOffers].split(separator).includes(offerSlug) || // Or not included in enabled offers
    config[enabledOffers] !== "" && !config[enabledOffers].split(separator).includes(offerSlug)
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
