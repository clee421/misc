const chai = require('chai');
const expect = chai.expect;
const importTacticData = require('../../src/import_tactic_data.js');

describe('Import Data', function() {
  it('should data import from csv, parse data, then store in an array of Tactics', function(done) {
    importTacticData('./tests/part2-import/test_data.csv', data => {
      expect(data[0].id).to.equal(12187);
      expect(data[0].active).to.equal(true);
      expect(data[1].deleted).to.equal(true);
      expect(data[1].clickTrackerUrl).to.equal('https://ad.doubleclick.net/ddm/trackclk/N2724.1852769TRIPLELIFT.COM/B9457112.128485014;dc_trk_aid=301461699;dc_trk_cid=66292004;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?');
      expect(data[2].clickTrackerUrl).to.equal(null);
      expect(data[2].clickthroughPixelJson).to.equal(null);
      expect(data[3].impressionPixelJson).to.eql([ 'https://t.mookie1.com/t/v1/imp?migAgencyId=616&migSource=adsrv2&migRandom=[timestamp]&migTrackDataExt=3523435;130409495;303707848;0&migTrackFmtExt=client;io;ad;crtv&migUnencodedDest=https://ad.doubleclick.net/ddm/ad/N4406.1308838.XAXIS.COM/B9574157.130409495;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?' ]);
      expect(data[3].viewabilityPixelJson).to.eql([ 'https://cdn.doubleverify.com/dvtp_src.js?ctx=1362594&cmp=9574157&sid=1416456&plc=130409495&num=&adid=&advid=892261&adsrv=1&region=30&btreg=INSERT_BTREG&btadsrv=INSERT_BTADSRV&crt=&crtname=&chnl=&unit=&pid=&uid=&tagtype=&dvtagver=6.1.src' ]);
      expect(data[3].lastModified).to.equal('4/15/16 22:17');
      done()
    });
  });
});
