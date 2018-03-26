
// BOKKEY is test token in ropsten ethereum
// https://www.reddit.com/r/ethereum/comments/6i7twg/is_there_a_easy_and_fast_way_of_getting_some/

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
    
    var fromPubKey = '0xA526fC12265027638E1aD10FA86179Ee6a1fF848';  
    
    // Define the address to search witin, one with tokens from the contract preferably
    var addr = fromPubKey;
    // Token contract address, used call the token balance of the address in question
    var contractAddr = '0x583cbBb8a8443B38aBcC0c956beCe47340ea1367';
    // Get the address ready for the call, substring removes the '0x', as its not required
    var tknAddress = (addr).substring(2);
    // '0x70a08231' is the contract 'balanceOf()' ERC20 token function in hex. A zero buffer is required and then we add the previously defined address with tokens
    var contractData = ('0x70a08231000000000000000000000000' + tknAddress);
    // Now we call the token contract with the variables from above, response will be a big number string 
    web3.eth.call(
        {
            to: contractAddr, // Contract address, used call the token balance of the address in question
            data: contractData // Combination of contractData and tknAddress, required to call the balance of an address 
        },
        function(err, result) {
            if (result) {                
                var token = web3.fromWei(result)
                console.log('Tokens Owned: ' + token);
            }
            else {
                console.log(err); // Dump errors here
            }
        }
    );
 }