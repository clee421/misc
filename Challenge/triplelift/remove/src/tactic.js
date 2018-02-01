class Tactic {
  constructor(
    id,                         // number
    tacticId,                   // number
    creativeLibraryId,          // number
    creativeAssetId,            // number
    active,                     // bool           0/1 in .csv -> true/false
    deleted,                    // bool           0/1 in .csv -> true/false
    clickTrackerUrl,            // string         url
    clickTrackerEncodingLevel,  // number         0/1 in .csv -> keep as 0/1 because not sure if "level" is more than 1
    impressionPixelJson,        // array[string]  url
    jsPixelJson,                // array[string]  null/[] in .csv -> should be an array with JS code for pixel?
    clickthroughPixelJson,      // array[string]  url -> could also be null
    viewabilityPixelJson,       // array[string]  url -> could also be null
    lastModified                // date           date -> format: 02/25/2016 21:54:04 (no timezone)
  ) {
    this.id = id;
    this.tacticId = tacticId;
    this.creativeLibraryId = creativeLibraryId;
    this.creativeAssetId = creativeAssetId;
    this.active = active;
    this.deleted = deleted;
    this.clickTrackerUrl = clickTrackerUrl;
    this.clickTrackerEncodingLevel = clickTrackerEncodingLevel;
    this.impressionPixelJson = impressionPixelJson;
    this.jsPixelJson = jsPixelJson;
    this.clickthroughPixelJson = clickthroughPixelJson;
    this.viewabilityPixelJson = viewabilityPixelJson;
    this.lastModified = lastModified;
  }
}

module.exports = Tactic;