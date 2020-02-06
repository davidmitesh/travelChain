const ipfsAPI = require('ipfs-api');
const ipfs = new ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const fs= require('fs');

// let testFile = fs.readFileSync("new.json");
// // //Creating buffer for ipfs function to add file to the system
// let testBuffer = new Buffer(testFile);

// ipfs.files.add(c, function (err, file) {
//     if (err) {
//       console.log(err);
//     }
//
// console.log(file);})
const input = [
  {
    'id': '0x10',
    'date': '14.07.2018'
  },
  {
    'id': '0x20',
    'date': '14.07.2018'
  },
  {
    'id': '0x30',
    'date': '14.07.2018'
  }
]

ipfs.files.add(Buffer.from(JSON.stringify(input)))
  .then(res => {
    const hash = res[0].hash
    console.log('added data hash:', hash)
    return ipfs.files.cat(hash)
  })
  .then(output => {
    console.log('retrieved data:', JSON.parse(output))
  })
