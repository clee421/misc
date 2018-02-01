const fetch = require('node-fetch');
// const axios = require('axios');
const importTacticData = require('./import_tactic_data');

fetch('http://ohlone.vizu.com/a.gif?vzcid=22747&vzadid=nativeunit&vzsid=triplelift&vzwc=none&ord=[RANDOM]')
  .then(function(response) {
    console.log(typeof response.status);
  })
  .catch( e => {
    console.log(e);
  });

// importTacticData('test_data.txt', data => {
//   for (let j = 0; j < data.length; j++) {
//     let tactic = data[j];
//     for (let i = 0; i < tactic.impressionPixelJson.length; i++) {
//       fetch(tactic.impressionPixelJson[i]).then( resp => {
//         console.log(resp);
//       });
//     }
//   }
// });

// fetch('https://t.mookie1.com/t/v1/imp?migAgencyId=616&migSource=adsrv2&migRandom=[timestamp]&migTrackDataExt=3523435;130409495;303707848;0&migTrackFmtExt=client;io;ad;crtv&migUnencodedDest=https://ad.doubleclick.net/ddm/ad/N4406.1308838.XAXIS.COM/B9574157.130409495;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?').then( resposne => {
//   console.log(resposne.status);
// });

// tacticArray.forEach( (tactic, tacticIndex) => {
//   if (!tactic.impressionPixelJson) return;
//   tactic.impressionPixelJson.forEach( (pxURL, urlIndex) => {
//     return fetch(pxURL).then( response => {
      
//       const statusNumberType = Math.floor(response.status / 100);
//       if (statusNumberType === 2 || statusNumberType === 3) {
//         console.log($`Failure! Response {response.status}`);
//         console.log($`ID: {tactic.id}`);
//         console.log($`URL: {pxURL}`);
//         failTactic++;
//       }
//       totalTactic++;

//       if (tacticIndex === tacticArray.length - 1 && urlIndex === tactic.impressionPixelJson.length - 1) {
//         console.log($`Total Success: {totalTactic - failTactic}/{totalTactic}`);
//         console.log($`Total Failure: {failTactic}/{totalTactic}`);
//       }
//     }).catch(error => {
//       console.log(error);
//     });
//   });
// });

      // fetch(pxUrl)
      // fectchTimeout(pxUrl, {
      //   method: 'GET'
      // }, 10000)
      // .then( resp => {
      //   let statusType = Math.floor(resp.status / 100);
      //   if (statusType === 4 || statusType === 5) {
      //     failPxUrl++;
      //     console.log("*********************************");
      //     console.log(`ID: ${tactic.id}`);
      //     console.log(`URL: ${pxUrl}`);
      //     console.log(`Status: ${resp.status}`);
      //   }

      //   totalPxUrl++;

      //   if (totalPxUrl === totalPxUrlToCheck) {
      //     const success = totalPxUrl - failPxUrl - fetchError;
      //     console.log(`Success: ${success}/${totalPxUrl}`);
      //     console.log(`Failure: ${failPxUrl}/${totalPxUrl}`);
      //     console.log(`Timeout: ${fetchError}/${totalPxUrl}`);
      //   }
        

      // }).catch( e => {
      //   console.log("*********************************");
      //   console.log(`ID: ${tactic.id}`);
      //   console.log(`URL: ${pxUrl}`);
      //   console.log(`Error: ${e.name}`);
      //   console.log(`Message: ${e.message}`);

      //   fetchError++;
      //   totalPxUrl++;

      //   if (totalPxUrl === totalPxUrlToCheck) {
      //     const success = totalPxUrl - failPxUrl - fetchError;
      //     console.log(`Success: ${success}/${totalPxUrl}`);
      //     console.log(`Failure: ${failPxUrl}/${totalPxUrl}`);
      //     console.log(`Timeout: ${fetchError}/${totalPxUrl}`);
      //   }
      // });

        // for (let i = 0; i < tacticArray.length; i++) {
  //   if (!!tacticArray[i].impressionPixelJson) {
  //     for (let j = 0; j < tacticArray[i].impressionPixelJson.length; j++) {
  //       if (!!tacticArray[i].impressionPixelJson[j]) {
  //         totalPxUrlToCheck++;
  //       }
  //     }
  //   }
  // }

  // let totalPxUrl = 0;
  // let failPxUrl = 0;
  // let fetchError = 0;

    // for (let i = 0; i < subTacticArray.length; i++) {
  //   if (!!subTacticArray[i].impressionPixelJson) {
  //     for (let j = 0; j < subTacticArray[i].impressionPixelJson.length; j++) {
  //       if (!!subTacticArray[i].impressionPixelJson[j]) {
  //         totalPxUrlToCheck++;
  //       }
  //     }
  //   }
  // }