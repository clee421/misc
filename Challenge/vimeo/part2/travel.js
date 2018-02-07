const Position = require('./position');

const travelClockwise = (width, height) => {
  const pos = new Position([0,0], width, height);

  pos.start();

  while(pos.haveSpace()) {
    pos.goRight();
    pos.goDown();
    pos.goLeft();
    pos.goUp();
  }
  
};

module.exports.travelClockwise = travelClockwise;