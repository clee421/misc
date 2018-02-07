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
  }

  start() {
    console.log("Starting!");
    this.showPosition();
  }

  haveSpace() {
    return this.bounds.left <= this.bounds.right &&
           this.bounds.top <= this.bounds.bottom;
  }

  showPosition() {
    console.log(`${this.row}-${this.col}`);
  }

  goRight(){
    if(!this.haveSpace()) return;

    console.log("Going right!");
    while(this.col + 1 <= this.bounds.right) {
      this.col++;
      this.showPosition();
    }

    this.bounds.top++;
  }

  goDown(){
    if(!this.haveSpace()) return;

    console.log("Going down!");
    while(this.row + 1 <= this.bounds.bottom) {
      this.row++;
      this.showPosition();
    }

    this.bounds.right--;
  }

  goLeft(){
    if(!this.haveSpace()) return;

    console.log("Going left!");
    while(this.col - 1 >= this.bounds.left) {
      this.col--;
      this.showPosition();
    }

    this.bounds.bottom--;
  }

  goUp(){
    if(!this.haveSpace()) return;

    console.log("Going up!");
    while(this.row - 1 >= this.bounds.top) {
      this.row--;
      this.showPosition();
    }

    this.bounds.left++;
  }

}

module.exports = Position;