/**
 * Copyright 2023 Jason Go
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-nocheck
import { addAddress } from './addAddress'

export const patchedCode = (): void => {
  /*! ========== KAJABI CODE STARTS HERE. COPYRIGHT BY KAJABI. ALL RIGHTS RESERVED. ========== */
  /*! Derived from https://kajabi-app-assets.kajabi-cdn.com/assets/checkout_manifest-beb59d57b2efd87b9ac8ac1f00432d86319f381c8387ca1af95d65307682494a.js */
  window.App.StripeElementsForm = function (t, e, n) {
    function i() {
        var t = {
            stripeAccount: n.stripeAccount,
            apiVersion: n.apiVersion
        };
        return s() && (t.betas = ['elements_enable_deferred_intent_beta_1']), t;
    }
    function r() {
        if (s()) {
            var t = {
                theme: 'stripe',
                variables: {
                    borderRadius: '4px',
                    colorPrimary: n.checkoutPageColor,
                    colorDanger: T.colorDanger,
                    colorTextPlaceholder: T.placeholderColor,
                    colorIcon: T.placeholderColor,
                    fontSizeBase: T.fontSize,
                    fontFamily: '-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", sans-serif',
                    fontSmooth: 'always',
                    fontLineHeight: T.lineHeight
                },
                rules: {
                    '.Label': {
                        fontWeight: '500',
                        marginBottom: '8px'
                    },
                    '.TabLabel': { fontWeight: '500' },
                    '.Input': {
                        fontWeight: '400',
                        borderColor: '#C7CFD8',
                        boxShadow: 'none',
                        color: '#556370',
                        padding: '6px 12px'
                    },
                    '.Input::placeholder': {
                        fontWeight: '400',
                        fontFamily: '-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", sans-serif',
                        letterSpacing: '0px',
                        boxShadow: 'none',
                        color: '#748493'
                    },
                    '.Input--invalid': {
                        fontWeight: '400',
                        fontFamily: '-apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", sans-serif',
                        letterSpacing: '0px',
                        boxShadow: 'none',
                        borderColor: '#C7CFD8',
                        color: '#556370'
                    },
                    '.Error': { fontSize: '12px' }
                }
            };
            return {
                mode: 'payment',
                paymentMethodTypes: a(),
                externalPaymentMethodTypes: n.acceptsPaypal && E ? ['external_paypal'] : [],
                amount: Math.max(T.amount, 50),
                currency: T.currency.toLowerCase(),
                appearance: t,
                locale: n.locale,
                fonts: [
                    { cssSrc: 'https://fonts.googleapis.com/css?family=Open+Sans:400,400i' },
                    {
                        family: 'Circular',
                        src: 'url(https://sage.kajabi-cdn.com/fonts/circular/CircularXXWeb-Regular.woff2?v=1)',
                        weight: '400'
                    },
                    {
                        family: 'Circular',
                        src: 'url(https://sage.kajabi-cdn.com/fonts/circular/CircularXXWeb-Bold.woff2?v=1)',
                        weight: '700'
                    }
                ]
            };
        }
        return {
            locale: n.locale,
            fonts: [{ cssSrc: 'https://fonts.googleapis.com/css?family=Open+Sans:400,400i' }]
        };
    }
    function o() {
        return s() ? '#payment-element' : '#card-element';
    }
    function s() {
        return 'payment' === n.mode || E;
    }
    function a() {
        return E ? n.additionalPaymentMethods.concat(['card']) : ['card'];
    }
    function l(t) {
        F.toggleClass(j, t);
    }
    function u() {
        !H && R && B && (H = !0, ktag('event', 'add_payment_info', B));
    }
    function c() {
        t.attr('data-return-to') && window.location.replace(t.attr('data-return-to'));
    }
    function d(e) {
        if (P.length) {
            var n = $(P).find('input[type=\'checkbox\']');
            P.hide();
        }
        if (e.error)
            l(!0), f(e), p(e), c();
        else if (e.setupIntent) {
            l(!1);
            var i = e.setupIntent.payment_method;
            T.paymentMethodField.val(i), t[0].submit();
        } else if (e.paymentMethod) {
            l(!1);
            var i = e.paymentMethod;
            T.paymentMethodField.val(i.id), s() && ('external_paypal' !== window.currentSelection && $('#checkout_offer_payment_method_type').val(i.type), 'card' !== window.currentSelection && $('#checkout_offer_consent_to_store_payment_method').val(0)), t[0].submit();
        } else
            e.complete && 'card' === window.currentSelection && (l(!1), C(n), P.show(), u(event));
    }
    function h(e, n) {
        if (e.error)
            'invalid_request_error' === e.error.type && 'payment_intent_authentication_failure' === e.error.code ? n ? w() : _() : d(e);
        else if (e.paymentIntent) {
            l(!1);
            var i = e.paymentIntent.id;
            T.paymentIntentField.val(i), t[0].submit();
        } else
            d(e);
    }
    function f(e) {
        window.App.flashError({ text: e.error.message }), setTimeout(function () {
            $.rails.enableFormElements(t);
        }, 100);
    }
    function p(e) {
        var n;
        t.find('input.email')[0] && (n = t.find('input.email').val());
        var i = {
            stripe_elements_error_report: {
                email: n,
                stripe_result: e
            }
        };
        $.post('/stripe_elements_error_reports.json', i);
    }
    function m(t) {
        t.brand !== L && (F.trigger('card-brand-change', t.brand), L = t.brand);
    }
    function g(t, e) {
        'manual' === t.confirmation_method ? N.handleCardAction(W).then(function (t) {
            h(t, e);
        }) : N.handleCardPayment(W).then(function (t) {
            h(t, e);
        });
    }
    function v(t, e) {
        N.retrievePaymentIntent(t).then(function (t) {
            t.paymentIntent && 'requires_action' === t.paymentIntent.status ? g(t.paymentIntent, e) : t.paymentIntent && 'requires_confirmation' === t.paymentIntent.status ? w() : d(t);
        });
    }
    function y() {
        window.ApplePaySession && a().indexOf('apple_pay') >= 0 && b();
    }
    function b() {
        var e = CLIENT_INFO.offer_token;
        e && $.ajax({
            type: 'POST',
            url: '/offers/' + e + '/checkout/verify_apple_pay_domain',
            data: { domain: window.location.host }
        }).done(function (e) {
            e.verified === !0 && t.attr('data-kp-ap-verified', !0);
        });
    }
    function w() {
        $.ajax({
            url: t.attr('action'),
            method: 'POST',
            dataType: 'json',
            data: t.serialize()
        }).done(function (t) {
            t.paymentIntent && 'requires_action' === t.paymentIntent.status ? g(t.paymentIntent, !1) : h(t, !1);
        });
    }
    function _() {
        $.ajax({
            url: t.attr('action').replace('confirm', 'cancel'),
            method: 'POST',
            dataType: 'json',
            data: t.serialize()
        }).done(function (t) {
            t.paymentIntent && 'canceled' === t.paymentIntent.status ? c() : h(t, !1);
        });
    }
    function C(t) {
        P.length && t.prop('checked', O);
    }
    function x() {
        var t = {
            hidePostalCode: q,
            iconStyle: 'solid',
            style: {
                base: {
                    iconColor: T.placeholderColor,
                    color: T.color,
                    lineHeight: T.lineHeight,
                    fontSize: T.fontSize,
                    fontFamily: '"Open Sans", sans-serif',
                    fontWeight: 'normal',
                    fontSmoothing: 'antialiased',
                    '::placeholder': {
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
        return M.create('card', t);
    }
    function k(t) {
        p({
            readyState: document.readyState,
            elementType: s() ? 'payment' : 'card',
            error: t,
            stripeJsVersion: N && N.version,
            analyticsOptions: B,
            paymentMethods: a(),
            additionalPaymentMethods: n.additionalPaymentMethods,
            stripeAccount: n.stripeAccount,
            stripeTimeoutPromptEnabled: n.stripeElementTimeoutPrompt
        });
    }
    function S() {
        var t = M.create('payment', {
            layout: {
                type: E ? 'accordion' : 'tabs',
                defaultCollapsed: !0,
                radios: !0,
                spacedAccordionItems: !1
            },
            business: { name: n.siteName },
            fields: { billingDetails: { email: 'never' } },
            wallets: {
                googlePay: n.additionalPaymentMethods && n.additionalPaymentMethods.indexOf('google_pay') >= 0 ? 'auto' : 'never',
                applePay: n.additionalPaymentMethods && n.additionalPaymentMethods.indexOf('apple_pay') >= 0 ? 'auto' : 'never'
            }
        });
        return t.on('change', function (t) {
            window.currentSelection === t.value.type, window.currentSelection = t.value.type, $(document).trigger('external_paypal' === window.currentSelection ? 'kjb:checkout:paypalSelected' : 'kjb:checkout:otherSelected'), P.hide();
        }), t;
    }
    this.$eventBus = $(document);
    var T = $.extend({
        color: '#151515',
        colorDanger: '#e2422d',
        fontSize: '14px',
        paymentMethodField: t.find('[data-stripe-payment-method]').first(),
        paymentIntentField: t.find('[data-stripe-payment-intent]').first(),
        lineHeight: '36px',
        placeholderColor: '#999999'
    }, n);
    this.$opts = T;
    var E = n.additionalPaymentMethods && n.additionalPaymentMethods.length > 0, A = o(), F = $(A), P = $('#manage_payment_method'), D = $('#checkout_offer_offer_price_override'), O = P.prop('checked'), j = 'card-element-has-error', N = 'undefined' == typeof Stripe ? null : Stripe(e, i()), M = N && N.elements(r());
    this.$elements = M;
    var I, L, R = null !== document.querySelector('.offer-checkout--analytics'), B = n.analyticsOptions, q = 'true' === T.hidePostalCode, H = !1;
    if (window.currentSelection = 'card', this.$completionRequired = !1, N || k({
            code: 'stripe_js_not_loaded',
            message: 'Stripe JS was loaded not at time of elements form initialization'
        }), F.length) {
        n.stripeElementTimeoutPrompt && t.find('input.btn').attr('disabled', !0), setTimeout(function () {
            window.stripeReady || (k({
                code: 'initialization_timeout',
                message: 'Did not receive ready from element within expected time'
            }), n.stripeElementTimeoutPrompt && window.App.flashError({ text: n.stripeElementTimeoutPromptMessage }));
        }, 10000);
        var I = s() ? S() : x();
        if (I.mount(A), s() && y(), null !== document.querySelector('.offer-checkout--preview') && null !== document.querySelector('.offer-checkout-next-gen'))
            return;
        I.on('ready', function () {
            t.find('input.btn').attr('disabled', !1), window.stripeReady = !0;
        }), I.on('change', function (t) {
            F.trigger('card-change', t), d(t), m(t);
        }), F.on('card-reset', function () {
            l(!1), I.clear(), I.focus();
        }), F.on('card-error', function () {
            l(!0);
        });
    }
    if (D.length && s() && D.on('change keyup paste', function () {
            var t = Number($(D).val()), e = Math.floor(Math.max(t * Math.pow(10, n.exponent), 50));
            M.update({ amount: e });
        }), s() && (this.$eventBus.on('kjb:checkout:coupon:applied', this.onCouponApplied.bind(this)), this.$eventBus.on('kjb:checkout:coupon:removed', this.onCouponRemoved.bind(this)), this.$eventBus.on('kjb:checkoutPaymentStepComplete', this.onPaymentStepComplete.bind(this)), this.$eventBus.on('kjb:checkoutPaymentStepIncomplete', this.onPaymentStepIncomplete.bind(this))), t.on('submit', function (e) {
            if ((!s() || this.$completionRequired) && !(window.kjbStripeElementSkip || 'external_paypal' === window.currentSelection || window.giftCouponApplied || window.freePwyw)) {
                e.preventDefault(), $.rails.disableFormElements(t);
                var i = {};
                t.find('input[data-stripe="name"]')[0] && (i.name = t.find('input[data-stripe="name"]').val()), t.find('input[data-stripe="address_zip"]')[0] && (i.address = { postal_code: t.find('input[data-stripe="address_zip"]').val() }), i.email = t.find('input[type="email"]').val(), n.intent ? N.handleCardSetup(n.intent, I, { payment_method_data: { billing_details: addAddress(i) } }).then(d) : I ? N.createPaymentMethod('card', I, { billing_details: addAddress(i) }).then(d) : t[0].submit();
            }
        }.bind(this)), t.attr('data-payment-intent-client-secret')) {
        var W = t.attr('data-payment-intent-client-secret'), Y = 'true' === t.attr('data-reconfirmable');
        t.attr('data-automatic-confirmation') && v(W, Y), $('[data-confirm-stripe-payment-intent]').on('click', function () {
            event.preventDefault(), v(W, Y);
        });
    }
}
window.App.StripeElementsForm.bindTo = function (t) {
    var e = $(t), n = e.closest('form'), i = JSON.parse(e.attr('data-stripe-elements-options') || '{}');
    new window.App.StripeElementsForm(n, e.attr('data-stripe-elements-form'), i);
}
window.App.StripeElementsForm.prototype = {
    onCouponApplied: function (t, e) {
        this.$elements.update({ amount: Math.max(e.due_now_price, 50) });
    },
    onCouponRemoved: function () {
        this.$elements.update({ amount: Math.max(this.$opts.amount, 50) });
    },
    onPaymentStepComplete: function () {
        this.$completionRequired = !1;
    },
    onPaymentStepIncomplete: function () {
        this.$completionRequired = !0, 'external_paypal' === window.currentSelection && $(document).trigger('kjb:checkout:paypalSelected');
    }
}
$(function () {
    $('[data-stripe-elements-form]').each(function (t, e) {
        window.App.StripeElementsForm.bindTo(e);
    });
})
  /*! ========== KAJABI CODE ENDS HERE. COPYRIGHT BY KAJABI. ALL RIGHTS RESERVED. ========== */
}
