const STATIC = require('./static');

class Dice {
  constructor(vals) {
    if (vals.length !== 6) {
      throw new Error(STATIC.RED + 'Each dice must have exactly 6 values.' + STATIC.RESET);
    }
    this.vals = vals;
  }
}

module.exports = Dice;
