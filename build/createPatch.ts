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

import fetch from 'cross-fetch'
import { parseScript } from 'esprima'
import esquery from 'esquery'
import { generate } from 'escodegen'
import { readFileSync, writeFileSync } from 'fs'

let checkoutManifestURL = ''

const main = (js: string): void => {
  console.log('Step 3: Parsing downloaded checkout_manifest.js')
  // Get all the related ASTs
  const targetASTs = esquery(
    parseScript(js),
    '[left.property.name="StripeElementsForm"], [left.object.property.name="StripeElementsForm"], [callee.name="$"]:has([property.name="StripeElementsForm"])'
  )

  const patchedCode = readFileSync('./build/template.ts')
    .toString()
    .replace('checkout_manifest.js', checkoutManifestURL)
    .replace(
      '// PLACEHOLDER',
      targetASTs
        .map((ast) => generate(ast))
        .join('\n')
        .replace(/(^|\s)App./g, '$1window.App.')
        .replace(/billing_details\s*:\s*(.+?)\s*}/g, 'billing_details: addAddress($1) }')
        .replace(/window.location.replace\((.+?).attr\('data-return-to'\)\)/, "window.location.replace(sanitizeUrl($1.attr('data-return-to')))")
    )
  console.log('Step 4: Creating src/patch.ts')
  writeFileSync('./src/patch.ts', patchedCode)
  console.log('Step 5: Source directory ready for bundling and transpiling')
}

try {
  console.log('Step 1: Determining the latest checkout_manifest.js from the Web Archive')
  void fetch('https://web.archive.org/web/timemap/json?url=https%3A%2F%2Fkajabi-app-assets.kajabi-cdn.com%2Fassets%2Fcheckout_manifest&matchType=prefix&collapse=urlkey&output=json&fl=original%2Ctimestamp&filter=!statuscode%3A%5B45%5D..&limit=10000')
    .then(async (r) => await r.json())
    .then(timemap => {
      let latestTimestamp = 0

      for (let i = 1; i < timemap.length; i++) {
        const timestamp = parseInt(timemap[i][1], 10)
        if (!isNaN(timestamp) && timestamp > latestTimestamp) {
          latestTimestamp = timestamp
          checkoutManifestURL = timemap[i][0]
        }
      }

      if (checkoutManifestURL !== '') {
        console.log('Step 2: Downloading ' + checkoutManifestURL)
        void fetch(checkoutManifestURL)
          .then(async (r) => await r.text())
          .then(main)
      }
    })
} catch ($e) {
  console.log($e)
}
