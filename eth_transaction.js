// create an instance of web3 using the HTTP provider.
// NOTE in mist web3 is already available, so check first if it's available before instantiating
// https://infura.io/ -> make your api
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

var mainnet = "https://mainnet.infura.io/FU8..."
var testnet = "https://ropsten.infura.io/FU8...";
var web3 = new Web3(new Web3.providers.HttpProvider(testnet));

if(!web3.isConnected()) {
    // show some dialog to ask the user to start a node
    console.log('Not Connected!'); 
 } else {  
    // start web3 filters, calls, etc
    console.log('Connected!');
    
    //sendTransaction
    var fromPubKey = '0xA526fC12265027638E1aD10FA86179Ee6a1fF848';
    var fromPriKey = '70d...';
    var toPubKey = '0x6020B93cce52196FA9C7915B3BC3D83009cd244D';
    
    var privateKey = new Buffer(fromPriKey, 'hex');
    
    var nonceHex = web3.toHex( web3.eth.getTransactionCount(fromPubKey) );//보내는사람의 전송 넌스
    var gasLimit = web3.toHex('100000');
    var gasPrice = web3.toHex(web3.eth.gasPrice.toNumber());
    var value = web3.toHex(web3.toWei('0.01'));

    console.log("nonceHex:",nonceHex);
    console.log("gasLimit:",gasLimit);
    console.log("gasPrice:",gasPrice);
    console.log("value:",value);
    
    var rawTx = {
        nonce: nonceHex,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: toPubKey, 
        value: value, 
        data: '0x'
    }
    var tx = new Tx(rawTx);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    
    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {                
        if (!err) console.log(hash); // transaction hash
        else console.log(err);
    });

 }