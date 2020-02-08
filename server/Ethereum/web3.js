const Web3 =require("web3");

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //doesnot return undefined
  //means we are running in browser and metamask is injected in the browser.
  web3 = new Web3(window.web3.currentProvider); //to match the versions of the web3
} else {
  //we are running in the server or user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/82acffcf5a3c4987a0766b846d793dcb"
  );
  web3 = new Web3(provider);
}

module.exports={web3} ;
