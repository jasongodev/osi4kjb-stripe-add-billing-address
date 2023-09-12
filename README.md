# Kajabi Stripe Add Billing Address
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/osi4kjb-stripe-add-billing-address?color=blue&label=Downloads&logo=jsdelivr)](https://www.jsdelivr.com/package/npm/osi4kjb-stripe-add-billing-address)
[![GitHub](https://img.shields.io/github/license/jasongodev/osi4kjb-stripe-add-billing-address?&color=blue&label=License&logo=github)](LICENSE)
[![CodeQL](https://github.com/jasongodev/osi4kjb-stripe-add-billing-address/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/jasongodev/osi4kjb-stripe-add-billing-address/actions/workflows/github-code-scanning/codeql)
[![](https://img.shields.io/badge/Code%20Style-Standard-brightgreen?logo=typescript)](https://standardjs.com/)

This script adds the address to the billing details when Kajabi checkout form submits data to Stripe.

Kajabi by default only submits the zip code to Stripe. This script will run when the address fields are present in the checkout form and will include the address details upon submission to Stripe.

## ✨ Features
- Super tiny, < 1KB minified gzipped.
- Set and forget. No configuration required.
- Zero dependencies.
- Made by a Kajabi Hero!

## 🔧 Installation

1. Go to Kajabi Admin Settings -> Checkout Settings
2. Go to the Checkout Footer Code box andcope-paste this code:

```html
<script async src="https://cdn.jsdelivr.net/npm/osi4kjb-stripe-add-billing-address@latest"></script>
```

It is strongly advised to use the script from the CDN because it is automatically updated.

### Optional Configuration

You can enable or disable the script on specific offers by specifying the offer slug in the configuration.

In this example offer URL, `www.yourdomain.com/offers/DcTeKx7o/checkout`, the `DcTeKx7o` is the offer slug. You may combine more slugs using a comma.

#### Enable only on certain offers

Add the `data-enabled-offers` attribute in the script tag as shown below.

```html
<script async src="https://cdn.jsdelivr.net/npm/osi4kjb-stripe-add-billing-address@latest"
data-enabled-offers="zWPgUzB2,DcTeKx7o"
></script>
```
Here's the behavior of this configuration:
- `data-enabled-offers` not specified in script tag = Script will run on ALL offers
- `data-enabled-offers` is blank = Script will run on ALL offers
- `data-enabled-offers` has some slugs = Script will only run on these offers

#### Disabled on certain offers

Add the `data-disabled-offers` attribute in the script tag as shown below.

```html
<script async src="https://cdn.jsdelivr.net/npm/osi4kjb-stripe-add-billing-address@latest"
data-disabled-offers="zWPgUzB2,DcTeKx7o"
></script>
```
Here's the behavior of this configuration:
- `data-disabled-offers` not specified in script tag = Ignored, proceed in checking `data-enabled-offers`
- `data-disabled-offers` is blank = Ignored, proceed in checking `data-enabled-offers`
- `data-disabled-offers` has some slugs = Script will not run on these slugs regardless of `data-enabled-offers` setting.

### You can use both configurations at the same time but `data-disabled-offers` takes precedence

```html
<!-- Only runs on Offer zWPgUzB2, disabled on DcTeKx7o, will not run with other offers --->
<script async src="https://cdn.jsdelivr.net/npm/osi4kjb-stripe-add-billing-address@latest"
data-enabled-offers="zWPgUzB2"
data-disabled-offers="DcTeKx7o"
></script>
```

```html
<!-- Only runs on Offer aW3dfgvB, disabled on DcTeKx7o, also disabled on zWPgUzB2 because disable config takes precedence, and will not run with other offers --->
<script async src="https://cdn.jsdelivr.net/npm/osi4kjb-stripe-add-billing-address@latest"
data-enabled-offers="aW3dfgvB,zWPgUzB2"
data-disabled-offers="DcTeKx7o,zWPgUzB2"
></script>
```

```html
<!-- Will run on all offers except DcTeKx7o and zWPgUzB2 --->
<script async src="https://cdn.jsdelivr.net/npm/osi4kjb-stripe-add-billing-address@latest"
data-enabled-offers=""
data-disabled-offers="DcTeKx7o,zWPgUzB2"
></script>
```

## Frequently Asked Questions

### For whom is this script for?
- For merchants whose Stripe accounts were registered in a country that requires the complete billing address of the customers. Stripe India accounts are an example of this.
- For other regular Stripe accounts that needs the complete address for automation. For example, when Stripe is connected to Zapier or other webhooks that needs the address to be passed on the next workflow like automated shipping or conversion tracking.

### Why not Kajabi submit the complete address to Stripe?
Addresses are considered personal identifiers and therefore certain jurisdictions like the EU have rules regarding sharing of information to third party processors. For most cases, addresses are not needed during payment authorizations.

However, certain countries like India requires the complete address. You may say, why not Kajabi just include the address detail for Stripe India merchants? Well, the Stripe API does not have any way to tell which country the Stripe merchant belongs and so Kajabi does not have a way to know.

### What exactly does Stripe India want?
- Offers with INR currency should be used by India-residents only.
- Offers with INR currency may be used by non-India residents if their card's bank issuer allows for it. Still, may or may not be successful.
- Offers with non-INR currency should be used by non-India residents only.
- Residency is usually judged using the buyer's card origin and IP address.
- In all cases, the complete address is needed.

### Is the code secure?

Yes. The script only patches the code related to the `billing_details` property that is sent to Stripe during form submission. You may audit the codes yourself.

### Will this work if my checkout page includes PayPal?

If you have Stripe and Paypal enabled in your offers, the script will only work for Stripe payments.

The script only affects the codes related to your own Kajabi-linked Stripe account. It will not affect the code integration with PayPal. It will not include the address details when the form is submitted to PayPal.

### Will this affect how Kajabi Payments powered by Stripe submits data to Stripe?

If you have your own Kajabi-linked Stripe account and Kajabi Payments enabled in your offers, the script will only work for your own Stripe account's payments.

The script only affects the codes related to your own Kajabi-linked Stripe account. It will not affect the codes and routines related to Kajabi Payments even if it is based on Stripe Connect. Also, Kajabi Payments uses Kajabi's US-based Stripe account which does not need the complete address details during payment authorization.

### Will this affect the speed of my checkout page?

No. The script is so tiny and compressed that it will be downloaded in an instant. It is also cached globally using a CDN so it is always available. The script also runs asynchronously and will not block rendering.

### Will this affect the speed of my landing pages?

No. The script only runs in the checkout pages because it is only embedded in the Checkout Footer Code.

### Is this compatible with Kajabi's Payment Popups?

No. Payment Popups only works for US-based Stripe accounts. You don't need to submit the complete address to Stripe US accounts. Also, the script only runs in the checkout page and not in landing or site pages.

In the future when Payment Popups becomes available to other Stripe countries then we will make updates to this script to suit your needs.

### Is this compatible with the Embed Checkout Form Script?

Yes. The Embed Checkout Form Script (osi4kjb-embed-checkout-form) is a script that allows you to embed Kajabi checkout forms in any site or landing pages under the same domain. The codes do not conflict nor concern each other and therefore is compatible.

### Is this compatible with Jodee's Tab Switcher?
Yes. Jodee Peevor, another Kajabi Hero, created a code that allows switching of offers based on pricing using tab switchers. It works by loading the other offer's page as you click the tabs. These codes do not conflict nor concern the script and therefore is compatible.

### Why do we put it in Checkout Footer Code and not in the Header Code?

The script must run after Kajabi's checkout codes executed. The scripts in the Checkout Footer Code runs after Kajabi's code and therefore is the ideal place to put the script.

### Can I embed the actual JavaScript code as an inline script? I want to load it together with the checkout page at once.

You can but you will lose the ability to get updates. You will have to update your codes manually. I don't recommend this.

## 📦 Advanced Usage

### Install as ES Module
```html
<script>
  import { stripeAddBillingAddress } from 'https://cdn.jsdelivr.net/npm/osi4kjb-stripe-add-billing-address@latest/+esm';

  stripeAddBillingAddress();
</script>
```

### Import as ES Module in your own package

1. Install the package using any NPM-compatible package manager

```bash
pnpm i osi4kjb-stripe-add-billing-address
```

2. Import the function using this code

```typescript
  import { stripeAddBillingAddress } from 'osi4kjb-stripe-add-billing-address'

  stripeAddBillingAddress()
```

### Bundle your own script
1. Run the following shell commands to clone the git repository and build the script.
```bash
git clone https://github.com/jasongodev/osi4kjb-stripe-add-billing-address.git
cd osi4kjb-stripe-add-billing-address
pnpm build
```
2. In the `dist` folder you will see the following:
  - saba.min.js: Minified script for use with browser. Self-executing.
  - saba.min.js.map: Sourcemap for debugging.
  - saba.mjs: ES Module script for importing in packages

# License
Copyright 2023 Jason Go

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

# Sponsors
<a target="_blank" href="https://www.browserstack.com/"><img width="200" src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png"></a><br>
[BrowserStack Open-Source Program](https://www.browserstack.com/open-source)
