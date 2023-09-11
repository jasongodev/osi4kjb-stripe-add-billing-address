/**
 * @license
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

import { win, doc, domReady } from './utils'
import { addAddress } from './addAddress'
import { enabledOffersKey, disabledOffersKey, separator, inputCountryId } from './strings'

const patch = (): void => {
  const app = win.App
  const originalConstructor = app.StripeElementsForm

  let serializedConstructor: string = originalConstructor.toString()
  serializedConstructor = serializedConstructor.replace(/{\s*b(.+?)s\s*:\s*(.+?)\s*}/g, '{b$1s:App.SABA($2)}')

  const newConstructor = new Function('f', 's', 'o', `(${serializedConstructor})(f,s,o)`)

  // @ts-expect-error
  newConstructor.bindTo = originalConstructor.bindTo
  newConstructor.prototype = originalConstructor.prototype
  app.StripeElementsForm = newConstructor
  app.SABA = addAddress

  // @ts-expect-error
  doc.querySelectorAll('[data-stripe-elements-form]').forEach((el) => newConstructor.bindTo(el))
}

export const stripeAddBillingAddress = (): void => {
  const offerSlug = win.location.href.match(/\/offers\/(.{8})/)?.[1]

  const config = Object.assign(
    {
      [enabledOffersKey]: '',
      [disabledOffersKey]: ''
    },
    doc.currentScript?.dataset
  )

  if (
    // Not a checkout page
    offerSlug === undefined ||
    // Or included in disabled offers
    config[disabledOffersKey].split(separator).includes(offerSlug) ||
    // Or not included in enabled offers
    (config[enabledOffersKey] !== '' && !config[enabledOffersKey].split(separator).includes(offerSlug))
  ) {
    return
  }

  domReady(
    // Run the patch
    patch,
    // And limit waiting for 10 seconds...
    10000,
    // For these objects to exist before running the patch
    ['$', 'App', 'Stripe'],
    // And run only when address fields are present
    [inputCountryId]
  )
}
