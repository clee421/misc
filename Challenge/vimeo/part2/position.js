const RIGHT = "RIGHT";
const LEFT = "LEFT";
const UP = "UP";
const DOWN = "DOWN";

class Position {
  constructor(pos, width, height) {
    this.row = pos[0];
    this.col = pos[1];
    this.bounds = {
      left: 0,
      top: 0,
      right: width - 1,
      bottom: height - 1
    };

    this.history = [];
    this.output = true;
  }

  start() {
    if (this.output) console.log("Starting!");
    this.showPosition();
  }

  haveSpace() {
    return this.bounds.left <= this.bounds.right &&
           this.bounds.top <= this.bounds.bottom;
  }

  showPosition() {
    const pos = `${this.row}-${this.col}`;
    this.history.push(pos);
    if (this.output) console.log(pos);
  }

  displayInfo(direction) {
    if (!this.output) return;

    switch(direction) {
      case LEFT:
        console.log("Going left!");
        break;
      case RIGHT:
        console.log("Going right!");
        break;
      case UP:
        console.log("Going up!");
        break;
      case DOWN:
        console.log("Going down!");
        break;
    }
  }

  turnOffOutput() {
    this.output = false;
  }

  turnOnOutput() {
    this.output = true;
  }

  goRight(){
    if(!this.haveSpace()) return;

    this.displayInfo(RIGHT);
    while(this.col + 1 <= this.bounds.right) {
      this.col++;
      this.showPosition();
    }

    this.bounds.top++;
  }

  goDown(){
    if(!this.haveSpace()) return;

    this.displayInfo(DOWN);
    while(this.row + 1 <= this.bounds.bottom) {
      this.row++;
      this.showPosition();
    }

    this.bounds.right--;
  }

  goLeft(){
    if(!this.haveSpace()) return;

    this.displayInfo(LEFT);
    while(this.col - 1 >= this.bounds.left) {
      this.col--;
      this.showPosition();
    }

    this.bounds.bottom--;
  }

  goUp(){
    if(!this.haveSpace()) return;

    this.displayInfo(UP);
    while(this.row - 1 >= this.bounds.top) {
      this.row--;
      this.showPosition();
    }

    this.bounds.left++;
  }

}

module.exports = Position;