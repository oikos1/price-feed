const TronWeb = require('tronweb');
const fs = require('fs');
const CryptoUtils = require("@tronscan/client/src/utils/crypto");
const TransactionUtils = require("@tronscan/client/src/utils/transactionBuilder")
const BigNumber = require('bignumber.js');
const colors = require('colors');

const loadArtifact = name => {
    return JSON.parse(fs.readFileSync(`./build/contracts/${name}.json`));
};

const web3 = require('web3');

const HttpProvider = TronWeb.providers.HttpProvider;
// Full node http endpoint
const fullNode = new HttpProvider("http://192.168.0.108:9090");
// Solidity node http endpoint
const solidityNode = new HttpProvider("http://192.168.0.108:9090");
// Contract events http endpoint
const eventServer = "http://192.168.0.108:9090";

// update with your private key here
const privateKey = '3f2cdb5f5d5c8618b1aeb6b32ca4f32c9254c01150161962898eab4c089bc554';
const _address = 'TJzcZvmyrztfHhvCD8s6zi2AVYoscgWqtJ';

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

const pricefeed_Address = 'TKf633vvXqa7P9m1izvW4WSzbi2JGP4Ajk';
const pricefeed2_Address = 'TTfJDzieN5nBLSSLQHPPWETeckt2PykJDe';

const medianizer_Address = 'TUxPnshiKm79wn2dTAiYpSUgo3svg7DPNV'; 
const medianizer2_Address = 'TNEQziwuYv8Pa868zypUML5aYoh8pdq4k4'; 

const perFeed_Address = 'TK9wXnD9x1xnzUsM5FQY5iXhhPrXQMCE9N';

const SAI_GEM_Address = 'TUXJrBzi9vSVhUFSbBro1kUMbPh1KQuEmj';
const SKR_Address = 'TXCui2SDrwANpVGUCpVUjW3EZL8uh5KQAQ';

const deployContract = async (name, ...args) => {
    const Contract = loadArtifact(name);

    const contractInstance = await tronWeb.contract().new({
        abi: Contract.abi,
        bytecode: Contract.bytecode,
        feeLimit: 1000000000,
        callValue: 0,
        userFeePercentage: 100,
        from : _address,
        parameters: args
    });

    const address = tronWeb.address.fromHex(contractInstance.address);
    console.log(
        `Contract ${name} Deployed: address: ${address}, hexAddress: ${contractInstance.address}`
    );
    return contractInstance;
};

const loadContract = async address => {
    return await tronWeb.contract().at(address);
};


const _pricefeed = {
    "pricefeed": {
    "address":  tronWeb.address.toHex(pricefeed_Address),
    "abi":[{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zzz","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"caller","type":"address"},{"indexed":false,"name":"blockNumber","type":"uint256"},{"indexed":false,"name":"val","type":"bytes32"},{"indexed":false,"name":"flag","type":"bool"}],"name":"LogPeek","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"constant":false,"inputs":[],"name":"peek","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"read","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"val_","type":"uint128"},{"name":"zzz_","type":"uint32"}],"name":"poke","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"val_","type":"uint128"},{"name":"zzz_","type":"uint32"},{"name":"med_","type":"address"}],"name":"post","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"void","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]}  
};
const _pricefeed2 = {
    "pricefeed2": {
    "address":  tronWeb.address.toHex(pricefeed2_Address),
    "abi":[{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"zzz","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"caller","type":"address"},{"indexed":false,"name":"blockNumber","type":"uint256"},{"indexed":false,"name":"val","type":"bytes32"},{"indexed":false,"name":"flag","type":"bool"}],"name":"LogPeek","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"constant":false,"inputs":[],"name":"peek","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"read","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"val_","type":"uint128"},{"name":"zzz_","type":"uint32"}],"name":"poke","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"val_","type":"uint128"},{"name":"zzz_","type":"uint32"},{"name":"med_","type":"address"}],"name":"post","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"void","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]}  
};

const _medianizer = {
    "medianizer": {
    "address":  tronWeb.address.toHex(medianizer_Address),
    "abi":[{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"indexes","outputs":[{"name":"","type":"bytes12"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"next","outputs":[{"name":"","type":"bytes12"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes12"}],"name":"values","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"has","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"min","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"val","type":"bytes32"}],"name":"LogValue","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"constant":false,"inputs":[{"name":"wat","type":"address"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pos","type":"bytes12"},{"name":"wat","type":"address"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"min_","type":"uint96"}],"name":"setMin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"next_","type":"bytes12"}],"name":"setNext","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wat","type":"address"}],"name":"unset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pos","type":"bytes12"}],"name":"unset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"void","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"poke","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"peek","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"read","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"compute","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]}  
};

const _perFeed = {
    "perFeed": {
    "address":  tronWeb.address.toHex(perFeed_Address),
    "abi":[{"constant":true,"inputs":[],"name":"skr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gem","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"skr_","type":"address"},{"name":"gem_","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ray","type":"uint256"}],"name":"LogPer","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"constant":true,"inputs":[],"name":"pie","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"per","outputs":[{"name":"ray","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]}  
};

const pricefeed = tronWeb.contract(_pricefeed["pricefeed"].abi, _pricefeed["pricefeed"].address);
const pricefeed2 = tronWeb.contract(_pricefeed2["pricefeed2"].abi, _pricefeed2["pricefeed2"].address);

const medianizer = tronWeb.contract(_medianizer["medianizer"].abi, _medianizer["medianizer"].address);
const medianizer2 = tronWeb.contract(_medianizer["medianizer"].abi, medianizer2_Address);

const perFeed = tronWeb.contract(_perFeed["perFeed"].abi, perFeed_Address);

/*const hotAddress = '';
const daiAddress = '';
const exchangeAddress = '';
const multiSigWalletAddress = '';*/

const waitSendResponse = async txID => {
    for (let i = 0; i < 100; i++) {
        console.log(`wait Transaction ${txID}`);
        res = await tronWeb.trx.getTransactionInfo(txID);

        if (res.id) {
            if (res.receipt.result === 'SUCCESS') {
                return res.contractResult;
            } else {
                throw `${res.receipt.result} ${JSON.stringify(res)}`;
            }
        }
        await new Promise(r => {
            setTimeout(r, 1000);
        });
    }
};


 

const run = async () => {

    //deploy-fab
    const Pricefeed = !!pricefeed_Address ? await loadContract(pricefeed_Address) : await deployContract('PriceFeed');
    const Pricefeed2 = !!pricefeed2_Address ? await loadContract(pricefeed2_Address) : await deployContract('PriceFeed');

    const Medianizer = !!medianizer_Address ? await loadContract(medianizer_Address) : await deployContract('Medianizer');
    const Medianizer2 = !!medianizer2_Address ? await loadContract(medianizer2_Address) : await deployContract('Medianizer');

    const PerFeed = !!perFeed_Address ? await loadContract(perFeed_Address) : await deployContract('PerFeed', SKR_Address, SAI_GEM_Address);

    //console.log(web3.utils.toWei("0.00156780"));

/*
    pricefeed.setOwner( tronWeb.address.toHex(_address)  ).send({
            shouldPollResponse: true,
            callValue: 0, 
            from : _address
        }).then(function (res) {
            //console.log(res)
           // console.log(web3.utils.toAscii(res)) ;
            console.log(res);

        }).catch(function (err) {
            console.log(err)
    });

    pricefeed2.setOwner( tronWeb.address.toHex(_address)  ).send({
            shouldPollResponse: true,
            callValue: 0, 
            from : _address
        }).then(function (res) {
            //console.log(res)
           // console.log(web3.utils.toAscii(res)) ;
            console.log(res);

        }).catch(function (err) {
            console.log(err)
    });
 
*/
    /*pricefeed.read().call({
            shouldPollResponse: true,
            callValue: 0, 
            from : _address
        }).then(function (res) {
            //console.log(res)
           // console.log(web3.utils.toAscii(res)) ;

                console.log(web3.utils.toBN(res).toString());

        }).catch(function (err) {
            console.log(err)
    });*/
    
    /*medianizer.read().call({
            shouldPollResponse: true,
            callValue: 0, 
            from : _address
        }).then(function (res) {
            //console.log(res)
           // console.log(web3.utils.toAscii(res)) ;

                console.log(web3.utils.toBN(res).toString());

        }).catch(function (err) {
            console.log(err)
    });
*/

/*
    medianizer.set(pricefeed.address).send({
            shouldPollResponse: true,
            callValue: 0, 
            from : _address
        }).then(function (res) {
            //console.log(res)
           // console.log(web3.utils.toAscii(res)) ;

                console.log(res);

        }).catch(function (err) {
            console.log(err)
    });
    
    medianizer2.set(pricefeed2_Address).send({
            shouldPollResponse: true,
            callValue: 0, 
            from : _address
        }).then(function (res) {
            //console.log(res)
           // console.log(web3.utils.toAscii(res)) ;

                console.log(res);

        }).catch(function (err) {
            console.log(err)
    });    
*/

     /*pricefeed.post( web3.utils.toWei("0.0103999"), "1591994899", medianizer.address ).send({
            shouldPollResponse: true,
            callValue: 0, 
            from : _address
        }).then(function (res) {
            //console.log(res)
           // console.log(web3.utils.toAscii(res)) ;

                console.log(res);

        }).catch(function (err) {
            console.log(err)
    });

     pricefeed2.post( web3.utils.toWei("420.33316066"), "1591994899", medianizer2_Address ).send({
            shouldPollResponse: true,
            callValue: 0, 
            from : _address
        }).then(function (res) {
            //console.log(res)
           // console.log(web3.utils.toAscii(res)) ;

                console.log(res);

        }).catch(function (err) {
            console.log(err)
    });*/


    Pricefeed.LogPeek().watch((err, {result}) => {
        if (err) return console.error('Failed to bind event listener:', err);
        console.log("LogPeek" , result);
    });

    Pricefeed2.LogPeek().watch((err, {result}) => {
        if (err) return console.error('Failed to bind event listener:', err);
        console.log("LogPeek2" , result);
    });

    PerFeed.LogPer().watch((err, {result}) => {
        if (err) return console.error('Failed to bind event listener:', err);
        console.log("LogPer" , result);
    });

    /*PerFeed.per().send({
            shouldPollResponse: true,
            callValue: 0, 
            from : _address
        }).then(function (res) {
            console.log(web3.utils.toBN(res.ray._hex).toString());
        }).catch(function (err) {
            console.log(err)
    });*/

    // Watch for PriceUpdate event
    /*medianizer.LogValue().watch((err, {result}) => {
        if (err) return console.error('Failed to bind event listener:', err);
        console.log(result);
    });


    medianizer.peek().call({
            shouldPollResponse: true,
            callValue: 0, 
            from : "TRtNpmW7WMgzvAxiudYaF1JnxXxrKfMHM4"
        }).then(function (res) {
            //console.log(res)
           // console.log(web3.utils.toAscii(res)) ;

                console.log(res);

        }).catch(function (err) {
            console.log(err)
    });


    medianizer.read().call({
            shouldPollResponse: true,
            callValue: 0, 
            from : "TRtNpmW7WMgzvAxiudYaF1JnxXxrKfMHM4"
        }).then(function (res) {
            //console.log(res)
           // console.log(web3.utils.toAscii(res)) ;

                console.log(web3.utils.toBN(res).toString());

        }).catch(function (err) {
            console.log(err)
    });
    */

    /*medianizer.values(toBytes12(0)).call({
            shouldPollResponse: true,
            callValue: 0, 
            from : "TRtNpmW7WMgzvAxiudYaF1JnxXxrKfMHM4"
        }).then(function (res) {

            console.log("val : " + res)
           // console.log(web3.utils.toAscii(res)) ;

                

        }).catch(function (err) {
            console.log(err)
    });*/
    /*medianizer.next().call({
            shouldPollResponse: true,
            callValue: 0, 
            from : "TRtNpmW7WMgzvAxiudYaF1JnxXxrKfMHM4"
        }).then(function (res) {

            var next =  web3.utils.toDecimal(res);
           // console.log(web3.utils.toAscii(res)) ;
           for (var i=0; i < next; i++) {

                if (getVal(i)) {
                    console.log(  getVal(i)  );
                }
           }
               

        }).catch(function (err) {
            console.log(err)
    })*/

    //const res = await read(medianizer, 'next');
    //const next = web3.toDecimal(res);
    //console.log(res);
    //const values = [];
 
    //for (let i = 1; i < next; i++) {
      //values.push(read(medianizer, 'values', toBytes12(i)) );
    //};

};

run();


peek = async (addr, cb) => {

    const v = [];
    const feeds =  [];
    var medianizer = loadContract(addr); //getContract(addr);

    medianizer.then(function(result) {
        result.peek().call().then(val => {
          cb(val);
        });

    }, function(err) {
        console.log(err);
    });

}

peek(_medianizer["medianizer"].address, function(res) {

    value = res[0];//web3.fromWei(res[0]);
    flag = res[1];
    flagPrnt = flag.toString();
    
    //console.log(value  / Math.pow(10, 18));

    price = web3.utils.fromWei( web3.utils.toBN(value).toString() );
    !flag ? console.log(flagPrnt.red  + " " +  price.yellow  ) :  console.log(flagPrnt.green  + " " +  price.yellow  );    
});

peek(medianizer2_Address, function(res) {

    value = res[0];//web3.fromWei(res[0]);
    flag = res[1];
    flagPrnt = flag.toString();
    
    //console.log(value  / Math.pow(10, 18));

    price = web3.utils.fromWei( web3.utils.toBN(value).toString() );
    !flag ? console.log(flagPrnt.red  + " " +  price.yellow  ) :  console.log(flagPrnt.green  + " " +  price.yellow  );    
});

 
var getValues = function(addr, cb){
    const v = [];
    const feeds =  [];

    var medianizer = loadContract(addr); //getContract(addr);

    medianizer.then(function(result) {

        result.next().call().then(next => {
            for (var i=0; i< web3.utils.toDecimal(next);i++) {

                  result.values(toBytes12(i)).call().then(val => {
                    //console.log(val)
                    v.push(val);
                    if (v.length == 2){
                        cb(v);
                    }
                  }) ;      
            }

        });

    }, function(err) {
        console.log(err);
    });
}


var iterate = function(addr) {
    const feeds = [];
    getValues(addr, function(v){
        Object.values(v).forEach((x, i) => {
        if (x !== "0x0000000000000000000000000000000000000000") {
            feeds[x] = {
            idx: i
            };
        }
        });
        console.log(feeds)
    })
}


//iterate(_medianizer["medianizer"].address);
//iterate(medianizer2_Address);

//async function getContract(addr) {
    // Return new promise 
    // await loadContract(addr);
    //return new Promise(function(resolve, reject) {
     // Do async job
    //    const medianizer = tronWeb.contract(_medianizer["medianizer"].abi, addr);
    //    if (!medianizer) reject("err");
    //    resolve(medianizer);
    //})
//}

 
const repeat = (x, n) => n > 0 ? new Array(n + 1).join(x) : ""
//const rpad = (x, y, n) => x + repeat(y, n - x.length)
const lpad = (x, y, n) => repeat(y, n - x.length) + x
const toHex = wad => new BigNumber(wad.replace(".", "")).toString(16)
const toBytes12 = (wad) => `0x${lpad(toHex(`${wad}`), "0", 24)}`

//16进制的ASCII字符串转为byteArray格式。
function hexStr2byteArray(str) {
  var byteArray = Array();
  var d = 0;
  var j = 0;
  var k = 0;

  for (let i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;
      if (0 === (j % 2)) {
        byteArray[k++] = d;
        d = 0;
      }
    }
  }
  return byteArray;
}

/* Check if a char is hex char */
function isHexChar(c) {
  if ((c >= 'A' && c <= 'F') ||
      (c >= 'a' && c <= 'f') ||
      (c >= '0' && c <= '9')) {
    return 1;
  }
  return 0;
}
/* Convert a hex char to value */
function hexChar2byte(c) {
  var d = 0;
  if (c >= 'A' && c <= 'F') {
    d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }
  else if (c >= 'a' && c <= 'f') {
    d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
  }
  else if (c >= '0' && c <= '9') {
    d = c.charCodeAt(0) - '0'.charCodeAt(0);
  }
  return d;
}
