const path = require("path");
const solc = require("solc");
const fileSystem = require("fs-extra");

//Preparing for bin folder
const exportPath = path.resolve(__dirname, "bin");
fileSystem.removeSync(exportPath);

//Get contract path
const coinContract = path.resolve(__dirname, "contracts", "coin.sol");

//Read the contract from voting path
const coinSource = fileSystem.readFileSync(coinContract, "utf8");

var input = {
    language: 'Solidity',
    sources: {
        'coin.sol': {
            content: coinSource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ 'abi','evm.bytecode' ]
            }
        }
    }
}

try{
    const output = JSON.parse(solc.compile(JSON.stringify(input)),1);
     console.log(output.contracts["coin.sol"]);
    for (let contract in output.contracts["coin.sol"]) {
        fileSystem.outputJSONSync(
          path.resolve(exportPath, "coinABI.json"),
          output.contracts["coin.sol"][contract].abi
        );

        fileSystem.outputJSONSync(
          path.resolve(exportPath, "coinBytecode.json"),
          output.contracts["coin.sol"][contract].evm.bytecode.object
        );
      }

}catch(error){
    console.log(error);
}
