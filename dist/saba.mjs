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
var $2 = (s) => {
  return document.querySelector(s);
};

// src/addAddress.ts
var addAddress = (billingDetails) => {
  var _a3, _b2;
  billingDetails.address = {
    postal_code: $2("#checkout_offer_extra_contact_information_address_zip").value,
    city: $2("#checkout_offer_extra_contact_information_address_city").value,
    country: $2("#input-address-country").value,
    line1: $2("#checkout_offer_extra_contact_information_address_line_1").value,
    line2: $2("#checkout_offer_extra_contact_information_address_line_2").value === "" ? $2("#checkout_offer_extra_contact_information_address_line_1").value : $2("#checkout_offer_extra_contact_information_address_line_2").value,
    state: (_b2 = $2("#checkout_offer_extra_contact_information_address_state")) == null ? void 0 : _b2.options[(_a3 = $2("#checkout_offer_extra_contact_information_address_state")) == null ? void 0 : _a3.selectedIndex].text
  };
  return billingDetails;
};

// src/patch.ts
import { sanitizeUrl } from "@braintree/sanitize-url";
var patchedCode = () => {
  /*! ========== KAJABI CODE STARTS HERE. COPYRIGHT BY KAJABI. ALL RIGHTS RESERVED. ========== */
  /*! Derived from https://kajabi-app-assets.kajabi-cdn.com/assets/checkout_manifest-beb59d57b2efd87b9ac8ac1f00432d86319f381c8387ca1af95d65307682494a.js */
  window.App.StripeElementsForm = function(t, e, n) {
    function i() {
      var t2 = {
        stripeAccount: n.stripeAccount,
        apiVersion: n.apiVersion
      };
      return s() && (t2.betas = ["elements_enable_deferred_intent_beta_1"]), t2;
    }
    function r() {
      if (s()) {
        var t2 = {
          theme: "stripe",
          variables: {
            borderRadius: "4px",
            colorPrimary: n.checkoutPageColor,
            colorDanger: T.colorDanger,
            colorTextPlaceholder: T.placeholderColor,
            colorIcon: T.placeholderColor,
            fontSizeBase: T.fontSize,
            fontFamily: '-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", sans-serif',
            fontSmooth: "always",
            fontLineHeight: T.lineHeight
          },
          rules: {
            ".Label": {
              fontWeight: "500",
              marginBottom: "8px"
            },
            ".TabLabel": { fontWeight: "500" },
            ".Input": {
              fontWeight: "400",
              borderColor: "#C7CFD8",
              boxShadow: "none",
              color: "#556370",
              padding: "6px 12px"
            },
            ".Input::placeholder": {
              fontWeight: "400",
              fontFamily: '-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", sans-serif',
              letterSpacing: "0px",
              boxShadow: "none",
              color: "#748493"
            },
            ".Input--invalid": {
              fontWeight: "400",
              fontFamily: '-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", sans-serif',
              letterSpacing: "0px",
              boxShadow: "none",
              borderColor: "#C7CFD8",
              color: "#556370"
            },
            ".Error": { fontSize: "12px" }
          }
        };
        return {
          mode: "payment",
          paymentMethodTypes: a(),
          externalPaymentMethodTypes: n.acceptsPaypal && E ? ["external_paypal"] : [],
          amount: Math.max(T.amount, 50),
          currency: T.currency.toLowerCase(),
          appearance: t2,
          locale: n.locale,
          fonts: [
            { cssSrc: "https://fonts.googleapis.com/css?family=Open+Sans:400,400i" },
            {
              family: "Circular",
              src: "url(https://sage.kajabi-cdn.com/fonts/circular/CircularXXWeb-Regular.woff2?v=1)",
              weight: "400"
            },
            {
              family: "Circular",
              src: "url(https://sage.kajabi-cdn.com/fonts/circular/CircularXXWeb-Bold.woff2?v=1)",
              weight: "700"
            }
          ]
        };
      }
      return {
        locale: n.locale,
        fonts: [{ cssSrc: "https://fonts.googleapis.com/css?family=Open+Sans:400,400i" }]
      };
    }
    function o() {
      return s() ? "#payment-element" : "#card-element";
    }
    function s() {
      return "payment" === n.mode || E;
    }
    function a() {
      return E ? n.additionalPaymentMethods.concat(["card"]) : ["card"];
    }
    function l(t2) {
      F.toggleClass(j, t2);
    }
    function u() {
      !H && R && B && (H = true, ktag("event", "add_payment_info", B));
    }
    function c() {
      t.attr("data-return-to") && window.location.replace(sanitizeUrl(t.attr("data-return-to")));
    }
    function d(e2) {
      if (P.length) {
        var n2 = $(P).find("input[type='checkbox']");
        P.hide();
      }
      if (e2.error)
        l(true), f(e2), p(e2), c();
      else if (e2.setupIntent) {
        l(false);
        var i2 = e2.setupIntent.payment_method;
        T.paymentMethodField.val(i2), t[0].submit();
      } else if (e2.paymentMethod) {
        l(false);
        var i2 = e2.paymentMethod;
        T.paymentMethodField.val(i2.id), s() && ("external_paypal" !== window.currentSelection && $("#checkout_offer_payment_method_type").val(i2.type), "card" !== window.currentSelection && $("#checkout_offer_consent_to_store_payment_method").val(0)), t[0].submit();
      } else
        e2.complete && "card" === window.currentSelection && (l(false), C(n2), P.show(), u(event));
    }
    function h(e2, n2) {
      if (e2.error)
        "invalid_request_error" === e2.error.type && "payment_intent_authentication_failure" === e2.error.code ? n2 ? w() : _() : d(e2);
      else if (e2.paymentIntent) {
        l(false);
        var i2 = e2.paymentIntent.id;
        T.paymentIntentField.val(i2), t[0].submit();
      } else
        d(e2);
    }
    function f(e2) {
      window.App.flashError({ text: e2.error.message }), setTimeout(function() {
        $.rails.enableFormElements(t);
      }, 100);
    }
    function p(e2) {
      var n2;
      t.find("input.email")[0] && (n2 = t.find("input.email").val());
      var i2 = {
        stripe_elements_error_report: {
          email: n2,
          stripe_result: e2
        }
      };
      $.post("/stripe_elements_error_reports.json", i2);
    }
    function m(t2) {
      t2.brand !== L && (F.trigger("card-brand-change", t2.brand), L = t2.brand);
    }
    function g(t2, e2) {
      "manual" === t2.confirmation_method ? N.handleCardAction(W).then(function(t3) {
        h(t3, e2);
      }) : N.handleCardPayment(W).then(function(t3) {
        h(t3, e2);
      });
    }
    function v(t2, e2) {
      N.retrievePaymentIntent(t2).then(function(t3) {
        t3.paymentIntent && "requires_action" === t3.paymentIntent.status ? g(t3.paymentIntent, e2) : t3.paymentIntent && "requires_confirmation" === t3.paymentIntent.status ? w() : d(t3);
      });
    }
    function y() {
      window.ApplePaySession && a().indexOf("apple_pay") >= 0 && b();
    }
    function b() {
      var e2 = CLIENT_INFO.offer_token;
      e2 && $.ajax({
        type: "POST",
        url: "/offers/" + e2 + "/checkout/verify_apple_pay_domain",
        data: { domain: window.location.host }
      }).done(function(e3) {
        e3.verified === true && t.attr("data-kp-ap-verified", true);
      });
    }
    function w() {
      $.ajax({
        url: t.attr("action"),
        method: "POST",
        dataType: "json",
        data: t.serialize()
      }).done(function(t2) {
        t2.paymentIntent && "requires_action" === t2.paymentIntent.status ? g(t2.paymentIntent, false) : h(t2, false);
      });
    }
    function _() {
      $.ajax({
        url: t.attr("action").replace("confirm", "cancel"),
        method: "POST",
        dataType: "json",
        data: t.serialize()
      }).done(function(t2) {
        t2.paymentIntent && "canceled" === t2.paymentIntent.status ? c() : h(t2, false);
      });
    }
    function C(t2) {
      P.length && t2.prop("checked", O);
    }
    function x() {
      var t2 = {
        hidePostalCode: q,
        iconStyle: "solid",
        style: {
          base: {
            iconColor: T.placeholderColor,
            color: T.color,
            lineHeight: T.lineHeight,
            fontSize: T.fontSize,
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: "normal",
            fontSmoothing: "antialiased",
            "::placeholder": {
              fontFamily: '"Open Sans", sans-serif',
              color: T.placeholderColor,
              iconColor: T.placeholderColor
            }
          },
          invalid: {
            color: T.colorDanger,
            iconColor: T.colorDanger
          }
        }
      };
      return M.create("card", t2);
    }
    function k(t2) {
      p({
        readyState: document.readyState,
        elementType: s() ? "payment" : "card",
        error: t2,
        stripeJsVersion: N && N.version,
        analyticsOptions: B,
        paymentMethods: a(),
        additionalPaymentMethods: n.additionalPaymentMethods,
        stripeAccount: n.stripeAccount,
        stripeTimeoutPromptEnabled: n.stripeElementTimeoutPrompt
      });
    }
    function S() {
      var t2 = M.create("payment", {
        layout: {
          type: E ? "accordion" : "tabs",
          defaultCollapsed: true,
          radios: true,
          spacedAccordionItems: false
        },
        business: { name: n.siteName },
        fields: { billingDetails: { email: "never" } },
        wallets: {
          googlePay: n.additionalPaymentMethods && n.additionalPaymentMethods.indexOf("google_pay") >= 0 ? "auto" : "never",
          applePay: n.additionalPaymentMethods && n.additionalPaymentMethods.indexOf("apple_pay") >= 0 ? "auto" : "never"
        }
      });
      return t2.on("change", function(t3) {
        window.currentSelection === t3.value.type, window.currentSelection = t3.value.type, $(document).trigger("external_paypal" === window.currentSelection ? "kjb:checkout:paypalSelected" : "kjb:checkout:otherSelected"), P.hide();
      }), t2;
    }
    this.$eventBus = $(document);
    var T = $.extend({
      color: "#151515",
      colorDanger: "#e2422d",
      fontSize: "14px",
      paymentMethodField: t.find("[data-stripe-payment-method]").first(),
      paymentIntentField: t.find("[data-stripe-payment-intent]").first(),
      lineHeight: "36px",
      placeholderColor: "#999999"
    }, n);
    this.$opts = T;
    var E = n.additionalPaymentMethods && n.additionalPaymentMethods.length > 0, A = o(), F = $(A), P = $("#manage_payment_method"), D = $("#checkout_offer_offer_price_override"), O = P.prop("checked"), j = "card-element-has-error", N = "undefined" == typeof Stripe ? null : Stripe(e, i()), M = N && N.elements(r());
    this.$elements = M;
    var I, L, R = null !== document.querySelector(".offer-checkout--analytics"), B = n.analyticsOptions, q = "true" === T.hidePostalCode, H = false;
    if (window.currentSelection = "card", this.$completionRequired = false, N || k({
      code: "stripe_js_not_loaded",
      message: "Stripe JS was loaded not at time of elements form initialization"
    }), F.length) {
      n.stripeElementTimeoutPrompt && t.find("input.btn").attr("disabled", true), setTimeout(function() {
        window.stripeReady || (k({
          code: "initialization_timeout",
          message: "Did not receive ready from element within expected time"
        }), n.stripeElementTimeoutPrompt && window.App.flashError({ text: n.stripeElementTimeoutPromptMessage }));
      }, 1e4);
      var I = s() ? S() : x();
      if (I.mount(A), s() && y(), null !== document.querySelector(".offer-checkout--preview") && null !== document.querySelector(".offer-checkout-next-gen"))
        return;
      I.on("ready", function() {
        t.find("input.btn").attr("disabled", false), window.stripeReady = true;
      }), I.on("change", function(t2) {
        F.trigger("card-change", t2), d(t2), m(t2);
      }), F.on("card-reset", function() {
        l(false), I.clear(), I.focus();
      }), F.on("card-error", function() {
        l(true);
      });
    }
    if (D.length && s() && D.on("change keyup paste", function() {
      var t2 = Number($(D).val()), e2 = Math.floor(Math.max(t2 * Math.pow(10, n.exponent), 50));
      M.update({ amount: e2 });
    }), s() && (this.$eventBus.on("kjb:checkout:coupon:applied", this.onCouponApplied.bind(this)), this.$eventBus.on("kjb:checkout:coupon:removed", this.onCouponRemoved.bind(this)), this.$eventBus.on("kjb:checkoutPaymentStepComplete", this.onPaymentStepComplete.bind(this)), this.$eventBus.on("kjb:checkoutPaymentStepIncomplete", this.onPaymentStepIncomplete.bind(this))), t.on("submit", function(e2) {
      if ((!s() || this.$completionRequired) && !(window.kjbStripeElementSkip || "external_paypal" === window.currentSelection || window.giftCouponApplied || window.freePwyw)) {
        e2.preventDefault(), $.rails.disableFormElements(t);
        var i2 = {};
        t.find('input[data-stripe="name"]')[0] && (i2.name = t.find('input[data-stripe="name"]').val()), t.find('input[data-stripe="address_zip"]')[0] && (i2.address = { postal_code: t.find('input[data-stripe="address_zip"]').val() }), i2.email = t.find('input[type="email"]').val(), n.intent ? N.handleCardSetup(n.intent, I, { payment_method_data: { billing_details: addAddress(i2) } }).then(d) : I ? N.createPaymentMethod("card", I, { billing_details: addAddress(i2) }).then(d) : t[0].submit();
      }
    }.bind(this)), t.attr("data-payment-intent-client-secret")) {
      var W = t.attr("data-payment-intent-client-secret"), Y = "true" === t.attr("data-reconfirmable");
      t.attr("data-automatic-confirmation") && v(W, Y), $("[data-confirm-stripe-payment-intent]").on("click", function() {
        event.preventDefault(), v(W, Y);
      });
    }
  };
  window.App.StripeElementsForm.bindTo = function(t) {
    var e = $(t), n = e.closest("form"), i = JSON.parse(e.attr("data-stripe-elements-options") || "{}");
    new window.App.StripeElementsForm(n, e.attr("data-stripe-elements-form"), i);
  };
  window.App.StripeElementsForm.prototype = {
    onCouponApplied: function(t, e) {
      this.$elements.update({ amount: Math.max(e.due_now_price, 50) });
    },
    onCouponRemoved: function() {
      this.$elements.update({ amount: Math.max(this.$opts.amount, 50) });
    },
    onPaymentStepComplete: function() {
      this.$completionRequired = false;
    },
    onPaymentStepIncomplete: function() {
      this.$completionRequired = true, "external_paypal" === window.currentSelection && $(document).trigger("kjb:checkout:paypalSelected");
    }
  };
  $(function() {
    $("[data-stripe-elements-form]").each(function(t, e) {
      window.App.StripeElementsForm.bindTo(e);
    });
  });
  /*! ========== KAJABI CODE ENDS HERE. COPYRIGHT BY KAJABI. ALL RIGHTS RESERVED. ========== */
};

// src/index.ts
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
    patchedCode,
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
