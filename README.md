# Zky wallet Crypto Utils

Crypto utilities for managing bitcoin embedded wallets.

## Usage

> npm install @KondorFinance/zky-crypto-utils

```js
import { keyDerivation } from '@KondorFinance/zky-crypto-utils';

// Deterministically derives a key seed from a BIP322 signature.
const keySeed = keyDerivation.getKeySeedFromBIP322Signature(BIP322signature);

// Converts an entropy string into a mnemonic phrase according to the BIP39 standard.
const mn = keyDerivation.getETHSeedMnemonics(keySeed)
```

## Functions
```js
function getKeySeedFromBIP322Signature(BIP322Signature: string): string;
function getETHSeedMnemonics(keySeed: string): string;
```

## License

[Apache License 2.0](./LICENSE)

Copyright (c) 2024 Kondor Finance, Ltd.