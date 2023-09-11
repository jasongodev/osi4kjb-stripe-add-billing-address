# Kajabi Stripe Add Billing Address
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/osi4kjb-stripe-add-billing-address?color=blue&label=Downloads&logo=jsdelivr)](https://www.jsdelivr.com/package/npm/osi4kjb-stripe-add-billing-address)
[![GitHub](https://img.shields.io/github/license/jasongodev/osi4kjb-stripe-add-billing-address?&color=blue&label=License&logo=github)](LICENSE)
[![CodeQL](https://github.com/jasongodev/osi4kjb-stripe-add-billing-address/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/jasongodev/osi4kjb-stripe-add-billing-address/actions/workflows/github-code-scanning/codeql)
[![](https://img.shields.io/badge/Code%20Style-Standard-brightgreen?logo=typescript)](https://standardjs.com/)


## Installation

1. Go to Kajabi Admin Settings -> Checkout Settings
2. Go to the Checkout Footer Code box andcope-paste this code:

```html
<script src="https://cdn.jsdelivr.net/npm/osi4kjb-stripe-add-billing-address@latest"></script>
```

It is strongly advised to use the script from the CDN because it is automatically updated when the Kajabi checkout script changes.

## Advanced Usage

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
