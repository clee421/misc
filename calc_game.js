// Goal, Moves, Instructions, Start
// Given a goal, number of moves, and a set of instructions,
// find the instructions used within the number of moves
// that will change the start until it becomes the goal
// goal - number (integer)
// start = number (integer)
// moves = number (ineger)
// instruction = array(strings)

class Instruction {
  constructor(string) {
    this.instruction = string;
  }
}

class CalculatorGame {
  constructor(start, goal, moves, instructions) {
    this.start = start;
    this.goal = goal;
    this.moves = moves;
    this.instructions = instructions.map( inst => new Instruction(inst));
  }
}

const game = new CalculatorGame(0, 5, 2, ["+10", "/2"]);
console.log(game);