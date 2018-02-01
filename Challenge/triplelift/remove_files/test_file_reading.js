const csv = require('csvtojson');
const Tactic = require('./tactic');

function processFile(inputFile, callback) {
  const tacticsArray = [];
  
  csv()
    .fromFile(inputFile)
    .on('json',(jsonObj)=>{
      tacticsArray.push(parseRawTacticData(jsonObj));
    })
    .on('done',(error)=>{
      callback(tacticsArray);
    });
}

const parseRawTacticData = function(inputObj) {
    const id = Number(inputObj.id);
    const tacticId = Number(inputObj.tactic_id);
    const creativeLibraryId = Number(inputObj.creative_library_id);
    const creativeAssetId = Number(inputObj.creative_asset_id);

    const active = inputObj.active === '0' ? false : true;
    const deleted = inputObj.deleted === '0' ? false : true;

    const clickTrackerUrl = inputObj.click_tracker_url;
    const clickTrackerEncodingLevel = Number(inputObj.click_tracker_encoding_level);

    const impressionPixelJson = parseCsvJsonData(inputObj.impression_pixel_json);
    const jsPixelJson = parseCsvJsonData(inputObj.js_pixel_json);
    const clickthroughPixelJson = parseCsvJsonData(inputObj.clickthrough_pixel_json);
    const viewabilityPixelJson = parseCsvJsonData(inputObj.viewability_pixel_json);

    const lastModified = inputObj.last_modified;

  return new Tactic(
    id,
    tacticId,
    creativeLibraryId,
    creativeAssetId,
    active,
    deleted,
    clickTrackerUrl,
    clickTrackerEncodingLevel,
    impressionPixelJson,
    jsPixelJson,
    clickthroughPixelJson,
    viewabilityPixelJson,
    lastModified
  );
};

// This line throws off the JSON.parse
// Looks to be an error with the data and should be kept consistent
// with what is currently availible
// I fixed the csv file as creating an extra check seems inefficient
// 1277,325375,4992,9337,1,0,,0,"[""https:\/\/ad.doubleclick.net\/ddm\/ad\/N5364.152304.OMGTRADINGDESK\/B8879138.120349247;sz=1x1;ord=[timestamp]?""]",[],[],[],9/3/15 17:46
const parseCsvJsonData = function(string) {
  if (string === 'NULL') {
    return null;
  } else if (string === "") {
    return string;
  } else {
    try {
      return JSON.parse(string.replace(/\\*/, ""));
    } catch(e) {
      console.log(e instanceof SyntaxError);
      console.log(e.message);
      console.log(e.name);
      console.log(string);
    }
  }
};

module.exports = processFile;

// processFile('tl_tactics.csv', data => console.log(data.length));
// processFile('test_data.txt', data => console.log(data));
// processFile('tactic.csv', data => console.log(data.length));