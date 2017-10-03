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
    switch(this.instruction) {
      case "negate":
        return num * -1;
      case "sum":
        return this.sumNumber(num);
      default:
        return this.hybridOperation(num);
    }
  }

  sumNumber(num) {
    let sum = 0;
    const stringNum = String(num);
    for (let i = 0; i < stringNum.length; i++) {
      sum += Number(stringNum[i]);
    }
    return sum;
  }

  hybridOperation(num) {
    if (this.instruction.includes("power")) {
      
    } else if (this.instruction.includes("replace")) {

    } else {
      return num;
    }
  }
}

class CalculatorGame {
  constructor(start, goal, moves, instructions) {
    this.start = start;
    this.goal = goal;
    this.moves = moves;
    this.instructions = instructions;
  }

  checkSolution(instructions) {
    let total = this.start;
    instructions.forEach( (instruction) => {
      instruction = new Instruction(instruction);
      total = instruction.applyInstruction(total);
    });
    return total === this.goal;
  }

  buildAllSolutions(moves = this.moves, instructions = this.instructions) {
    if (moves < 1) return [];
    if (moves === 1) {
      return instructions.map( inst => [inst]);
    }

    const prevSolutions = this.buildAllSolutions(moves - 1, instructions);
    const allSolutions = [];
    instructions.forEach( currentInst => {
      prevSolutions.forEach( prevInst => {
        allSolutions.push([currentInst, ...prevInst]);
      });
    });

    return allSolutions;
  }

  findSolution() {
    const allSolutions = this.buildAllSolutions();
    for (let i = 0; i < allSolutions.length; i++) {
      if (this.checkSolution(allSolutions[i])) {
        return allSolutions[i];
      }
    }
    return [];
  }
}

// constructor(start, goal, moves, instructions)
const game = new CalculatorGame(36, 11, 6, ["+3", "power3", "repalce0=>1", "sum"]);
console.log(game.findSolution());