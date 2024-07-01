// key_derivation.test.ts
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { getKeySeedFromBIP322Signature, getETHSeedMnemonics } from '../src/index';

describe('getKeySeedFromBIP322Signature', () => {
  it('should derive a key seed with valid mnemonics', () => {
    const BIP322Signature = 'HyH+zR7j+FGbE9RY0yvuUqdmFoVHHArh+MBx3g5WlQsKYM2dvSDekn8bRvDN07u4b+5agJ/8ZNxRDcuj2S7nWWE=';
    const derivedKeySeed = getKeySeedFromBIP322Signature(BIP322Signature);
    const mn = getETHSeedMnemonics(derivedKeySeed);
    expect(bip39.validateMnemonic(mn, wordlist)).toBe(true);
  });
});