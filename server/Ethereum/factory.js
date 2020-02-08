const {web3} = require("./web3.js");
const Coin = require("./bin/coinABI.json");

const instance = new web3.eth.Contract(
  Coin,
  "0x0764F7900f404998e261BE52991d31184e3a29EB"
);
const balance= instance.methods.minter().call();
console.log(balance);
// console.log(instance);
module.exports={instance} ;
//we have made this file solely for the purpose of code reusability.Because,we
//only deploy a factory instance once.
