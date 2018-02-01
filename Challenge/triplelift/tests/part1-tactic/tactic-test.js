const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const Tactic = require('../../src/tactic.js');

describe('Tactic', function() {
  it('tactic getters should return all items passed in', function() {
    const tactic = new Tactic(
      10,     // id
      348,    // tactic id
      9348,   // creative library id
      90084,  // creative asset id
      true,   // active
      false,  // deleted
      'http://triplelift.com/',   // click tracker url
      1,                          // click tracker encoding level
      ["http://triplelift.com/"], // impression pixel json
      ["http://triplelift.com/", "http://triplelift.com/"], // js pixel json
      [],                         // clickthrough pixel json
      null,                       // viewability pixel json
      '02/25/2016 21:54:04'       // last modified
    );
    expect(tactic.id).to.equal(10);
    expect(tactic.tacticId).to.equal(348);
    expect(tactic.creativeLibraryId).to.equal(9348);
    expect(tactic.creativeAssetId).to.equal(90084);
    expect(tactic.active).to.equal(true);
    expect(tactic.deleted).to.equal(false);
    expect(tactic.clickTrackerUrl).to.equal("http://triplelift.com/");
    expect(tactic.clickTrackerEncodingLevel).to.equal(1);
    expect(tactic.impressionPixelJson).to.eql(["http://triplelift.com/"]);
    expect(tactic.jsPixelJson).to.eql(["http://triplelift.com/", "http://triplelift.com/"]);
    expect(tactic.clickthroughPixelJson).to.eql([]);
    expect(tactic.viewabilityPixelJson).to.equal(null);
    expect(tactic.lastModified).to.equal("02/25/2016 21:54:04");
  });
});
