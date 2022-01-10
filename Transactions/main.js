const SHA256 = require('crypto-js/sha256');







class Block{
    constructor(index, timestamp, transaction, previousHash = ''){
    
        this.index = index;
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transaction)).toString();
    }

}


class Blockchain{

    constructor(){
        this.chain = [this.createGenesisBlock()];

    }
    createGenesisBlock(){
        return new Block("0", "03/05/2020", "6");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];


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


let program = new Blockchain();
program.addBlock(new Block(1, "08/05/2020", {amount: 10}));
program.addBlock(new Block(2, "09/05/2020", {amount: 13}));
program.addBlock(new Block(3, "10/05/2020", {amount: 9}));
program.addBlock(new Block(4, "12/05/2020", {amount: 7}));
program.addBlock(new Block(5, "15/05/2020", {amount: 5}));

console.log('Is the blockchain valid?' + program.isChainValid());

program.chain[1].transaction = { amount: 10 };
program.chain[1].hash = program.chain[1].calculateHash();

console.log('Is the blockchain valid?' + program.isChainValid());

program.chain[2].transaction = { amount: 13 };
program.chain[2].hash = program.chain[2].calculateHash();

console.log('Is the blockchain valid?' + program.isChainValid());

program.chain[3].transaction = { amount: 150 };
program.chain[3].hash = program.chain[3].calculateHash();

console.log('Is the blockchain valid?' + program.isChainValid());

program.chain[4].transaction = { amount: 7 };
program.chain[4].hash = program.chain[4].calculateHash();

console.log('Is the blockchain valid?' + program.isChainValid());

program.chain[5].transaction = { amount: 5 };
program.chain[5].hash = program.chain[5].calculateHash();

console.log('Is the blockchain valid?' + program.isChainValid());
console.log(JSON.stringify(program, null, 5));
