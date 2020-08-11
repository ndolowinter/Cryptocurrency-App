const ChainUtil = require('../chain-util');
const {MINING_REWARD} = require('../config');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  static transactionWithOutputs(senderWallet, outputs){
    const transaction = new this();
    transaction.outputs.push(...outputs);
    Transaction.signTransaction(transaction, senderWallet);
    return;
  }

  static newTransaction(senderWallet, recipient, amount) {
    if (amount > senderWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance.`);
      return;
    }

    Transaction.signTransaction(transaction, senderWallet);

    return Transaction.transactionWithOutputs(senderWallet,[
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient }
    ]);

  }

  static rewardTransactions(minerWallet,blockchainWallet){
    return Transaction.transactionWithOutputs(blockchainWallet, [{
      amount: MINE_REWARD, address: minerWallet.publicKey
    }]);
  }

  static signTransaction(transaction, senderWallet) {
  transaction.input = {
    timestamp: Date.now(),
    amount: senderWallet.balance,
    address: senderWallet.publicKey,
    signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
  };
}

}

module.exports = Transaction;
