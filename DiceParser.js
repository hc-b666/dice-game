const Dice = require("./Dice");

class DiceParser {
  static parse(args) {
    const diceArray = args.map((diceString, i) => {
      const values = diceString.split(",").map(Number);
      if (values.length !== 6 || values.some(isNaN)) {
        throw new Error(`Error: Argument ${i + 1} is invalid. Each argument must be a string of 6 comma-separated integers. Example: 2,2,4,4,9,9`);
      }
      return new Dice(values);
    });
    return diceArray;
  }
}

module.exports = DiceParser;