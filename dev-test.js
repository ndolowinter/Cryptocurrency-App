import {v1 as uuid} from 'uuid';

uuid();

const Wallet = require('./wallet');

const wallet = new Wallet();

  console.log(wallet.toString());
