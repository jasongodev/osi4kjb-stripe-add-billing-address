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

/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable no-new-func */

import { domReady, CustomWindow } from './utils'
import { addAddress } from './addAddress'

declare const window: CustomWindow
addAddress({})

const config = Object.assign(
  {
    enabledOffers: '',
    disabledOffers: ''
  },
  document.currentScript?.dataset
)

const offerSlug = window.location.href.match(/\/offers\/(.{8})/)?.[1] ?? ''

const patch = (): void => {
  let serializedConstructor: string = window.App.StripeElementsForm.toString()
  const serializedBindTo: string = window.App.StripeElementsForm.bindTo.toString()

  serializedConstructor = serializedConstructor.replace(/billing_details\s*:\s*(.+?)\s*}/g, 'billing_details: addAddress($1) }')

  window.App.StripeElementsForm = new Function('f', 's', 'o', `(${serializedConstructor})(f,s,o)`)
  window.App.StripeElementsForm.bindTo = new Function('e', `(${serializedBindTo})(e)`)

  document.querySelectorAll('[data-stripe-elements-form]').forEach((el) => window.App.StripeElementsForm.bindTo(el))
}

export const stripeAddBillingAddress = (): void => {
  if (
    // Not a checkout page
    offerSlug === '' ||
    // Or included in disabled offers
    config.disabledOffers.split(/\s*[,|]\s*/).includes(offerSlug) ||
    // Or not included in enabled offers
    (config.enabledOffers !== '' && !config.enabledOffers.split(/\s*[,|]\s*/).includes(offerSlug))
  ) {
    return
  }
  domReady(
    // Run the patched code
    patch,
    // But limit waiting for 10 seconds...
    10000,
    // For these objects to exist before running the patched code
    ['$', 'App', 'Stripe'],
    // And run only when address fields are present
    ['#checkout_offer_extra_contact_information_address_zip']
  )
}
