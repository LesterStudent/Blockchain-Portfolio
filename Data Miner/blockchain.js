const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');






class Block{
    constructor(timestamp, transaction, previousHash = ''){
    
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){

        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("1")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }

    findValidTransaction(){
        for(const ta of this.transaction){
            if(!ta.isValid()){
                return false;

            }
        }
        return true;

    }
}








class Transactions{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString;
    }

    signTransction(signKey){

        if(signKey.getPublic('hex') !== this.fromAddress){
            throw new Error('Sorry but you are unable to sign another persons wallet');
        }
        const hashTA = this.calculateHash();
        const signa = signKey.sign(hashTA, 'based 64');
        this.signature = signa.toDER('hex');
    }

    isValid(){
        if(this.fromAddress === null) return true;

        if(!this.signature || this.signature.length === 0){
            throw new Error('No signature');
        }

    
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);



    }

}



class Blockchain{
    constructor(){

        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTransactions = [];
        this.mineReward = 0;

    }

    createGenesisBlock(){
        return new Block("03/01/2020", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

  

    miningPendingTransacations(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log('Block mined successfully')
        this.chain.push(block);
        this.pendingTransactions = [new Transactions(null, miningRewardAddress, this.mineReward)];

    }


    addNewTransactions(transaction){

        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include addresses to and from');

        }
        if(!transaction.isValid()){
            throw new Error('Cannot add an invalid transaction to the chain');

        }
        this.pendingTransactions.push(transaction);
    }


    getBalanceofAddress(address){
        let balance = 100;

        for(const block of this.chain){
            for(const trans of block.transaction){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;

                }

            }
        }

        return balance;
    }





    isChainValid(){
        for(let i = 1; 1 < this.length; i++){
            const currentBlock = this.chain [i];
            const previousHash = this.chain[i - 1];

            if(!currentBlock.findValidTransaction()){
                return false;

            }

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        
        }

        return true;

    }
}

module.exports.Blockchain = Blockchain;
module.exports.Transactions = Transactions;