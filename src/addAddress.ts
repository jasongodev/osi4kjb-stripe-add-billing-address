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

import { $ } from './utils'

export const addAddress = (billingDetails: Record<string, any>): Record<string, any> => {
  billingDetails.address = {
    postal_code: ($('#checkout_offer_extra_contact_information_address_zip') as HTMLInputElement).value,
    city: ($('#checkout_offer_extra_contact_information_address_city') as HTMLInputElement).value,
    country: ($('#input-address-country') as HTMLInputElement).value,
    line1: ($('#checkout_offer_extra_contact_information_address_line_1') as HTMLInputElement).value,
    line2:
      ($('#checkout_offer_extra_contact_information_address_line_2') as HTMLInputElement).value === ''
        ? ($('#checkout_offer_extra_contact_information_address_line_1') as HTMLInputElement).value
        : ($('#checkout_offer_extra_contact_information_address_line_2') as HTMLInputElement).value,
    state: ($('#checkout_offer_extra_contact_information_address_state') as HTMLSelectElement)?.options[
      ($('#checkout_offer_extra_contact_information_address_state') as HTMLSelectElement)?.selectedIndex
    ].text
  }
  return billingDetails
}
