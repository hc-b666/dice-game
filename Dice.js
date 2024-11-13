class Dice {
  constructor(values) {
    if (values.length !== 6) throw new Error("Each dice must have exactly 6 values.");
    this.values = values;
  }
}

module.exports = Dice;
