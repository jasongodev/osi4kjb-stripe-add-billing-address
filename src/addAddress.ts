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

import { $ } from './utils'
import { addressStr, lineStr, valueKey, inputCountryId } from './strings'

export const addAddress = (billingDetails: Record<string, any>): Record<string, any> => {
  billingDetails.address = {
    postal_code: ($(addressStr + 'zip') as HTMLInputElement)[valueKey],
    city: ($(addressStr + 'city') as HTMLInputElement)[valueKey],
    country: ($(inputCountryId) as HTMLInputElement)[valueKey],
    line1: ($(addressStr + lineStr + '1') as HTMLInputElement)[valueKey],
    line2:
      ($(addressStr + lineStr + '2') as HTMLInputElement)[valueKey] === ''
        ? ($(addressStr + lineStr + '1') as HTMLInputElement)[valueKey]
        : ($(addressStr + lineStr + '2') as HTMLInputElement)[valueKey],
    state: ($(addressStr + 'state') as HTMLSelectElement)?.options[($(addressStr + 'state') as HTMLSelectElement)?.selectedIndex].text
  }
  return billingDetails
}
