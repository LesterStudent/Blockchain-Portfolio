const {Blockchain, Transactions} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('339eca4a01db12970c5ec26fa891641da04097a1eec37ea74a8e9e010f4a4003');
const myWalletAddress = myKey.getPublic('hex');


let example = new Blockchain();

const ta1 = new Transactions(myWalletAddress, 'public key', 10);
ta1.signTransction(myKey);
example.addNewTransactions(ta1);


console.log('\nStarting the miner');
example.miningPendingTransacations(myWalletAddress);

console.log('\nBalance of Alex is', example.getBalanceofAddress(myWalletAddress));

example.chain[1].transaction[0].amount = 1;

console.log('Is block valid?', example.isChainValid());



console.log('\nStarting the second miner');
example.miningPendingTransacations(myWalletAddress);

console.log('\nBalance of Bob is', example.getBalanceofAddress(myWalletAddress));

example.chain[1].transaction[0].amount = 1;

console.log('Is block valid?', example.isChainValid());



console.log('\nStarting the third miner');
example.miningPendingTransacations(myWalletAddress);

console.log('\nBalance of Lucy is', example.getBalanceofAddress(myWalletAddress));

example.chain[1].transaction[0].amount = 1;

console.log('Is block valid?', example.isChainValid());



console.log('\nStarting the fourth miner');
example.miningPendingTransacations(myWalletAddress);

console.log('\nBalance of Felix is', example.getBalanceofAddress(myWalletAddress));

example.chain[1].transaction[0].amount = 1;

console.log('Is block valid?', example.isChainValid());


console.log('\nStarting the fifth miner');
example.miningPendingTransacations(myWalletAddress);

console.log('\nBalance of Mat is', example.getBalanceofAddress(myWalletAddress));

example.chain[1].transaction[0].amount = 1;

console.log('Is block valid?', example.isChainValid());