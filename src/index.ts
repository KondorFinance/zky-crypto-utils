/////////////////////////////////////////////////////////////////////////////////
// Copyright 2024 Kondor Finance, Ltd.                                    //
//                                                                             //
// Licensed under the Apache License, Version 2.0 (the "License").             //
// You may not use this file except in compliance with the License.            //
// You may obtain a copy of the License at                                     //
//                                                                             //
// https://opensource.org/license/apache-2-0                               //
//                                                                             //
// Unless required by applicable law or agreed to in writing,                  //
// software distributed under the License is distributed on an "AS IS" BASIS,  //
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.    //
// See the License for the specific language governing permissions             //
// and limitations under the License.                                          //
/////////////////////////////////////////////////////////////////////////////////

import { Buffer } from "buffer"
import { keccak256 } from "@ethersproject/keccak256"
import * as assert from "assert"
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

const MIN_RANGE = BigInt(1);
const MAX_RANGE = BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140");

/**
 * Verifies if the given key seed is within the valid range.
 * 
 * @param keySeed The key seed to verify.
 * @returns {boolean} True if the key seed is within the valid range, false otherwise.
 */
const verifyValidKeySeed = (keySeed) => {
  return keySeed >= MIN_RANGE && keySeed <= MAX_RANGE;
}

/**
 * Converts an entropy string into a mnemonic phrase according to the BIP39 standard.
 * 
 * This function takes a hexadecimal string representing entropy, converts it into a byte array,
 * and then uses the BIP39 `entropyToMnemonic` function to generate a mnemonic phrase. The mnemonic
 * is generated using a specified wordlist.
 * 
 * @param entropy A hexadecimal string representing entropy.
 * @returns {string} A mnemonic phrase generated from the provided entropy.
 */
function getETHSeedMnemonics(entropy: string) {
  const entropyByteArray = Buffer.from(entropy, 'hex');
  return bip39.entropyToMnemonic(entropyByteArray, wordlist);
}

/**
 * Extracts and processes a key seed from a BIP322 signature.
 * 
 * This function decodes a BIP322 signature from base64, hashes it using keccak256,
 * and processes the hash to generate a valid key seed within a specified range.
 * The resulting seed is ensured to be 256 bits in length.
 * The given signature should be produced by the user signing a predetermined message in order to * guarantee getting the same seed each time it is invoked.
 * 
 * @param BIP322Signature The BIP322 signature in base64 encoding.
 * @returns {string} The processed key seed as a hex string.
 */
function getKeySeedFromBIP322Signature(BIP322Signature: string) {
  const BIP322SignatureBuffer = Buffer.from(BIP322Signature, "base64")
  const BIP322HashedSignature = keccak256(BIP322SignatureBuffer)
  const keySeed = BIP322HashedSignature.substring(0, 64);
  let keySeedBigInt = BigInt(keySeed) >> BigInt(5);
  keySeedBigInt %= MAX_RANGE;
  const keySeedHex = keySeedBigInt.toString(16).padStart(64, '0');
  assert(verifyValidKeySeed(keySeedBigInt), "Invalid key seed as it is out of range");
  const seedBytes = Buffer.from(keySeedHex, 'hex');
  assert(seedBytes.length === 32, "Invalid key seed length, key seed must be 256 bits.")
  return keySeedHex;
}

export {
  getKeySeedFromBIP322Signature,
  getETHSeedMnemonics
  // Function.
};