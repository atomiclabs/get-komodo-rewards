# get-komodo-rewards

> Calculate the accrued rewards for a given Komodo UTXO

[![Build Status](https://travis-ci.com/atomiclabs/get-komodo-rewards.svg?branch=master)](https://travis-ci.com/atomiclabs/get-komodo-rewards)
[![codecov](https://codecov.io/gh/atomiclabs/get-komodo-rewards/branch/master/graph/badge.svg)](https://codecov.io/gh/atomiclabs/get-komodo-rewards)
[![npm](https://img.shields.io/npm/v/get-komodo-rewards.svg)](https://www.npmjs.com/package/get-komodo-rewards)

Calculates the rewards in satoshis for a given Komodo UTXO. Heavily tested and 100% compliant with `komodod` consensus.

Originally built for our [Ledger KMD Reward Claim](https://github.com/atomiclabs/ledger-kmd-reward-claim) app. Released as a re-usable module for the benefit of the Komodo ecosystem.

## Install

```shell
npm install get-komodo-rewards
```

## Usage

Pass in a `utxo` object and an integer of the accrued rewards in satoshis will be returned.

```js
const getKomodoRewards = require('get-komodo-rewards');

const utxo = {
  tiptime: 1552292091,
  locktime: 1552248193,
  height: 1263192,
  satoshis: 3206795322480
};

const rewards = getKomodoRewards(utxo);
// 205000320
```

### Tip

`tiptime` should be the current tiptime from `komodod`.

If you don't have access to this you can use a client-side generated UNIX timestamp at the cost of slightly reduced accuracy. If you do this, use a timestamp ~10 minutes in the past to avoid over calculating the rewards and creating an invalid transaction.

## API

### getKomodoRewards(utxo)

Returns a the accrued rewards in satoshis.

#### utxo

Type: `Object`

An object containing the following properties of the UTXO:

##### tiptime

Type: `number`

The current tiptime of the Komodo blockchain.

##### locktime

Type: `number`

The locktime value of the UTXO.

##### height

Type: `number`

The height of the UTXO.

##### satoshis

Type: `number`

The value of the UTXO in satoshis.

## License

MIT © Atomic Labs<br />
MIT © Luke Childs
