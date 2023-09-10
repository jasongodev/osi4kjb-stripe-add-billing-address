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

import { domReady, CustomWindow, doc } from './utils'
import { addAddress, addressStr } from './addAddress'

declare const window: CustomWindow

const patch = (app = window.App): void => {
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
  const offerSlug = window.location.href.match(/\/offers\/(.{8})/)?.[1]
  const separator = /\s*[,|]\s*/
  const enabledOffers = 'enabledOffers'
  const disabledOffers = 'disabledOffers'

  const config = Object.assign(
    {
      [enabledOffers]: '',
      [disabledOffers]: ''
    },
    doc.currentScript?.dataset
  )

  if (
    // Not a checkout page
    offerSlug === undefined ||
    // Or included in disabled offers
    config[disabledOffers].split(separator).includes(offerSlug) ||
    // Or not included in enabled offers
    (config[enabledOffers] !== '' && !config[enabledOffers].split(separator).includes(offerSlug))
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
    [addressStr + '_zip']
  )
}
