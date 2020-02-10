var Web3 = require('web3');
const {networks}=require('./truffle-config.js');
var contract = require("@truffle/contract");
var CoinContract=require('./build/contracts/Coin.json');
var Provider=networks.ropsten.provider();
var web3=new Web3(Provider);
////This is the address of the contract created.Can be checked at 
//   https://ropsten.etherscan.io/
var contractAddess="0x97a10217572D7179a71Fa2674Cb7d6838a48a3D3";

var Coin = contract({
  abi:CoinContract.abi
});
let deployedInstance;
const user_1="0x88cb731b3e5bf3A35034147bA6DC1b8E2Fb47511";
const user_2="0x123BbEAaa3D4fce386D925f8e0188B3099aEEf18";
const user_3="0xc9A4D02e4fdB1C28Ce42A64c495607c7725404Bf";
var coin;
Coin.setProvider(Provider);

//-----To get the address of the token creator account-------------
//!!!!!!------------------------------------------------------------

     exports.getOwner=async()=>{
        await Coin.at(contractAddess).then(function(instance){
            coin=instance;
            return coin.minter();
        }).then(function(result){
            console.log(result)
        }).catch(function(err){
            console.log(err);
        });
    }

    //-----To transfer fund travelChain token to newly signed up user.-------------
    //!!!!!!------------------------------------------------------------
    exports.mintBalance=async()=>{
        await Coin.at(contractAddess).then(function(instance){
            coin=instance;
            return coin.mint(user_2,100,{from:user_1});
        }).then(function(result){
            console.log(result)
        }).catch(function(err){
            console.log(err);
        });
    }

    //-----To get the balance of a particular user.-------------
    //!!!!!!------------------------------------------------------------
    exports.getBalance=async(user)=>{
        await Coin.at(contractAddess).then(function(instance){
            coin=instance;
            return coin.balances(user);
        }).then(function(result){
            console.log(result.toNumber())
        }).catch(function(err){
            console.log(err);
        });
    }

    //-----To send the balance from one user to other.-------------
    //!!!!!!------------------------------------------------------------
    exports.sendBalance=async()=>{
        await Coin.at(contractAddess).then(function(instance){
            coin=instance;
            return coin.send(user_3,50,{from:user_2});
        }).then(function(result){
            console.log(result);

        }).catch(function(err){
            console.log(err);
        });
    }
