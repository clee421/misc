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

  applyInstruction(num) {
    const lead = this.instruction[0];
    let instNum = Number(this.instruction.slice(1));
    switch(lead) {
      case "+":
      case "-":
      case "/":
      case "x":
        return this.applyOperation(lead, num, instNum);

      default:
        return this.specialInstruction(num);
    }
  }

  applyOperation(op, numOne, numTwo) {
    switch(op) {
      case "+":
        return numOne + numTwo;
      case "-":
        return numOne - numTwo;
      case "x":
        return numOne * numTwo;
      case "/":
        return numOne / numTwo;
      default:
        return numOne;
    }
  }

  specialInstruction(num) {
    return num;
  }
}

class CalculatorGame {
  constructor(start, goal, moves, instructions) {
    this.start = start;
    this.goal = goal;
    this.moves = moves;
    this.instructions = instructions.map( inst => new Instruction(inst));
  }

  checkSolution(instructions) {
    let total = this.start;
    instructions.forEach( (instruction) => {
      total = instruction.applyInstruction(total);
    });
    return total === this.goal;
  }
}

const game = new CalculatorGame(0, 5, 2, ["+10", "/2"]);
console.log(game.checkSolution(game.instructions));