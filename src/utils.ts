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

export const doc = document

export const $ = <T extends keyof HTMLElementTagNameMap | string>(
  s: T
): T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] | null : HTMLElement | null => {
  return doc.querySelector(s) as T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : HTMLElement | null
}

export const domReady = (callback: Function, wait: number = 120000, objects: string[] = [], selectors: string[] = []): void => {
  const ctrl = setTimeout(() => {
    checkReady = () => {}
  }, wait)

  let checkReady = (): void => {
    if (doc.readyState.length > 7 && objects.every((key) => Object.hasOwn(window, key)) && selectors.every((selector) => $(selector))) {
      clearInterval(ctrl)
      callback()
    } else {
      setTimeout(checkReady, 9)
    }
  }

  checkReady()
}

export interface CustomWindow extends Window {
  App: any
}
