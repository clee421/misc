const fectchTimeout = require('fetch-timeout');
const importTacticData = require('./import_tactic_data');

const testTacticImpPixel = function(blockSize, wait) {
  return function(tacticArray) {
    let startPartition = 0;
    let endPartition = 0;
    const allPromiseResults = [];

    // curry the testing to allow for testing of partial blocks of the array
    // testing the whole array caused freezing and too many open connections
    const _partialUrlTest = () => {
      startPartition = endPartition;
      endPartition += blockSize

      // just for keeping user updated of the current block
      if (endPartition > tacticArray.length) endPartition = tacticArray.length;
      console.log(`Running data block ${startPartition} to ${endPartition}...`)

      const subTacticArray = tacticArray.slice(startPartition, endPartition);
      
      const fetchArray = [];
      subTacticArray.forEach( tactic => {
        if (!tactic.impressionPixelJson) return;
        tactic.impressionPixelJson.forEach( pxUrl => {
          if (!pxUrl) return;
          fetchArray.push(fetchUrlTimeout(tactic.id, pxUrl, wait));
        }); 
      });
    
      Promise.all(fetchArray).then( results => {
        allPromiseResults.push(...results)
        if (endPartition === tacticArray.length) {
          parseFetchedResults(allPromiseResults);
          process.exit(0);
        } else {
          _partialUrlTest();
        }
      });
    };

    _partialUrlTest();
  }
};

const fetchUrlTimeout = function(id, url, ms) {
  return fectchTimeout(url, {
    method: 'GET'
  }, ms)
  .then( resp => {
    return {resp: resp, id: id, status: "resolved"};
  }).catch( e => {
    return {error: e, id: id, url: url, status: "rejected"};
  });
};

const parseFetchedResults = function(results) {
  const total = results.length;
  let success = 0;
  let failure = 0;
  let timeout = 0;

  results.forEach( result => {
    if (result.status === "resolved") {
      let statusType = Math.floor(result.resp.status / 100);
      if (statusType === 4 || statusType === 5) {
        failure++;
        console.log(`***** Failed - ID: ${result.id} *****`);
        console.log(`Url: ${result.resp.url}`)
        console.log("");
      } else {
        success++;
      }
    } else {
      console.log(`***** Timed Out - ID: ${result.id} *****`);
      console.log(`Url: ${result.url}`)
      console.log("");
      timeout++;
    }
  });
  console.log(`Success: ${success}/${total}`);
  console.log(`Failure: ${failure}/${total}`);
  console.log(`Timeout: ${timeout}/${total}`);
};

// process.argv is an array containing the command line arguments. 
// The first element will be 'node', the second element will be the name of the JavaScript file. 
// The next elements will be any additional command line arguments.
// $ node test_tactic_imp_pixel.js tactic.csv 100 10000
// 0: .nvm/versions/node/v6.10.0/bin/node
// 1: /Projects/TripleLift/test_tactic_imp_pixel.js
// 2: 'tactic.csv'
// 3: '100'
// 4: '10000'

importTacticData(process.argv[2], testTacticImpPixel(Number(process.argv[3]), Number(process.argv[4])));