// BOKKEY is test token in ropsten ethereum
// https://www.reddit.com/r/ethereum/comments/6i7twg/is_there_a_easy_and_fast_way_of_getting_some/

// create an instance of web3 using the HTTP provider.
// NOTE in mist web3 is already available, so check first if it's available before instantiating
// https://infura.io/ -> make your api
var Web3 = require('web3');
var fs = require('fs');
var path = require('path');

var mainnet = "https://mainnet.infura.io/FU8..."
var testnet = "https://ropsten.infura.io/FU8...";
var web3 = new Web3(new Web3.providers.HttpProvider(testnet));
// console.log('web3.version:',web3.version)

if(!web3.isConnected()) {
    // show some dialog to ask the user to start a node
    console.log('Not Connected!'); 
 } else {  
    // start web3 filters, calls, etc
    console.log('Connected!'); 

    //sendTransaction
    var fromPubKey = '0x6020B93cce52196FA9C7915B3BC3D83009cd244D';
    var fromPriKey = '67f...';
    var toPubKey = '0xA526fC12265027638E1aD10FA86179Ee6a1fF848';

    var Tx = require('ethereumjs-tx');
    var privateKey = new Buffer(fromPriKey, 'hex');    
    
    var nonceHex = web3.toHex( web3.eth.getTransactionCount(fromPubKey) );//보내는사람의 전송 넌스
    var gasLimit = web3.toHex('100000');
    var gasPrice = web3.toHex(web3.eth.gasPrice.toNumber());
    var value = web3.toHex(web3.toWei('0'));
    
    // BOKKY Token contract ABI Array
    var abiArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, './BOKKY-contract-abi.json'), 'utf-8'));
    // The address of the contract which created BOKKY
    var contractAddress = "0x583cbBb8a8443B38aBcC0c956beCe47340ea1367";
    // var contract = new web3.eth.Contract(abiArray, contractAddress, {
    //     from: fromPubKey
    // });
    var contract = web3.eth.contract(abiArray).at(contractAddress);
    var transferAmount = web3.toWei(0.0001);
    // console.log('contract:',contract)  

    console.log("nonceHex:",nonceHex);
    console.log("gasLimit:",gasLimit);
    console.log("gasPrice:",gasPrice);
    console.log("value:",value);
    
    // var data = contract.methods.transfer(toPubKey, transferAmount).encodeABI()
    var data = contract.transfer.getData(toPubKey, transferAmount, {from: fromPubKey})
    console.log('data:',data)

    var rawTx = {
        nonce: nonceHex,        
        gasPrice: gasPrice,
        gasLimit: gasLimit,        
        to: contractAddress,        
        value: value,         
        data: data
    }    
    var tx = new Tx(rawTx);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    
    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {                
        if (!err) console.log(hash);
        else console.log(err);
    });

 }