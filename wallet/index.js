
const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const { INITIAL_BALANCE } = require('../config');


class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
  this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet -
    publicKey : ${this.publicKey.toString()}
    balance   : ${this.balance}`
  }

  sign(dataHash) {
  return this.keyPair.sign(dataHash);
}

createTransaction(recipient, amount, blockchain, transactionPool) {

this.balance = this.calculateBalance();

  if (amount > this.balance) {
    console.log(`Amount: ${amount}, exceeds current balance: ${this.balance}`);
    return;
  }

  let transaction = transactionPool.existingTransaction(this.publicKey);
  if (transaction) {
    transaction.update(this, recipient, amount);
  } else {
    transaction = Transaction.newTransaction(this, recipient, amount);
    transactionPool.updateOrAddTransaction(transaction);
  }

  return transaction;
}

calculateBalance(blockchain){
  let balance = this.balance;
  let transactions = [];
  blockchain.chain.forEach(block => block.data.forEach((transaction => {
    transactions.push(transaction);
  }));

  const walletInpuTs = transactions
  .filter(transaction => transaction.inputs.address === this.publicKey);

let startTime = 0;

if (walletInpuTs.length > 0){
  const recentInpuT = walletInpuTs.reduce(
    (prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current
  );

  balance = recentInpuT.outputs.find (output => output.address === this.publicKey).amount;
  startTime = recentInpuT.input.timestamp;
}

transactions.forEach(transaction => {
  if(transactions.input.timestamp > startTime){
    transaction.outputs.find(output => {
      if(output.address === this.publicKey){
        balance += output.amount;
    }
    });
  }
});

return balance;
}

static blockchainWallet(){
  const blockchainWallet = new this();
  blockchainWallet.address = 'blockchainWallet';
  return blockchainWallet;
}

}



module.exports = Wallet;
