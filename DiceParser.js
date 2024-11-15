const Dice = require('./Dice');

class DiceParser {
  static parse(args) {
    const dices = args.map((diceStr, i) => {
      const vals = diceStr.split(',').map(Number);
      if (vals.length !== 6 || vals.some(isNaN)) {
        throw new Error(`Error: Dice [${diceStr}] is invalid. Each argument must be a string of 6 comma-separated integers. Example: 2,2,4,4,9,9`);
      }
      return new Dice(vals);
    });
    return dices;
  }
}

module.exports = DiceParser;
