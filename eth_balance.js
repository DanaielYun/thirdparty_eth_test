// create an instance of web3 using the HTTP provider.
// NOTE in mist web3 is already available, so check first if it's available before instantiating
// https://infura.io/ -> make your api
var Web3 = require('web3');

var mainnet = "https://mainnet.infura.io/FU8..."
var testnet = "https://ropsten.infura.io/FU8...";
var web3 = new Web3(new Web3.providers.HttpProvider(testnet));

if(!web3.isConnected()) {
    // show some dialog to ask the user to start a node
    console.log('Not Connected!'); 
 } else {  
    // start web3 filters, calls, etc
    console.log('Connected!'); 
    
    var address = '0x6020B93cce52196FA9C7915B3BC3D83009cd244D';
    var balance = web3.fromWei( web3.eth.getBalance(address) );
    console.log('balance:', balance.toNumber());

 }