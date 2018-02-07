const Position = require('./position');

const travelClockwise = (width, height, output = true) => {
  const pos = new Position([0,0], width, height);
  if (!output) pos.turnOffOutput();

  pos.start();

  while(pos.haveSpace()) {
    pos.goRight();
    pos.goDown();
    pos.goLeft();
    pos.goUp();
  }
  
  return pos.history;
};

module.exports.travelClockwise = travelClockwise;