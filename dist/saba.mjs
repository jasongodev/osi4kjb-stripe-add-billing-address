/*! Copyright 2023 Jason Go - Apache-2.0 */

// src/utils.ts
var win = window;
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

// src/strings.ts
var separator = /\s*[,|]\s*/;
var enabledOffersKey = "enabledOffers";
var disabledOffersKey = "disabledOffers";
var addressStr = "#checkout_offer_extra_contact_information_address_";
var inputCountryId = "#input-address-country";
var lineStr = "line_";
var valueKey = "value";

// src/addAddress.ts
var addAddress = (billingDetails) => {
  var _a, _b;
  billingDetails.address = {
    postal_code: $(addressStr + "zip")[valueKey],
    city: $(addressStr + "city")[valueKey],
    country: $(inputCountryId)[valueKey],
    line1: $(addressStr + lineStr + "1")[valueKey],
    line2: $(addressStr + lineStr + "2")[valueKey] === "" ? $(addressStr + lineStr + "1")[valueKey] : $(addressStr + lineStr + "2")[valueKey],
    state: (_b = $(addressStr + "state")) == null ? void 0 : _b.options[(_a = $(addressStr + "state")) == null ? void 0 : _a.selectedIndex].text
  };
  return billingDetails;
};

// src/index.ts
var patch = () => {
  const app = win.App;
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
  const offerSlug = (_a = win.location.href.match(/\/offers\/(.{8})/)) == null ? void 0 : _a[1];
  const config = Object.assign(
    {
      [enabledOffersKey]: "",
      [disabledOffersKey]: ""
    },
    (_b = doc.currentScript) == null ? void 0 : _b.dataset
  );
  if (
    // Not a checkout page
    offerSlug === void 0 || // Or included in disabled offers
    config[disabledOffersKey].split(separator).includes(offerSlug) || // Or not included in enabled offers
    config[enabledOffersKey] !== "" && !config[enabledOffersKey].split(separator).includes(offerSlug)
  ) {
    return;
  }
  domReady(
    // Run the patch
    patch,
    // And limit waiting for 10 seconds...
    1e4,
    // For these objects to exist before running the patch
    ["$", "App", "Stripe"],
    // And run only when address fields are present
    [inputCountryId]
  );
};
export {
  stripeAddBillingAddress
};
