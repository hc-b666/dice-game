const readlineSync = require("readline-sync");
const Help = require("./Help");

class Player {
  static getPlayerChoice() {
    const ans = readlineSync.question("Your selection: ");
    return ans;
  }

  static handlePlayerChoice(options, maxValidIndex) {
    console.log(options);
    const ans = this.getPlayerChoice();

    if (ans === "x") {
      process.exit();
    } else if (ans === "?") {
      console.log(Help.getHelp());
      return "help";
    }

    const ansNum = Number(ans);
    if (isNaN(ansNum) || ansNum < 0 || ansNum > maxValidIndex) {
      console.log("Invalid selection. Please try again.");
      return;
    }

    return ansNum;
  }

  static guessFirstMove() {
    const options = `Try to guess my selection.\n0: 0\n1: 1\nx: exit\n?: help`;
    return this.handlePlayerChoice(options, 1);
  }

  static getPlayerDiceChoice(diceArray) {
    let options = "Choose your dice:\n";
    diceArray.forEach((dice, i) => {
      options += `${i}: ${dice.values.join(", ")}\n`;
    });
    options += "x: exit\n?: help";

    return this.handlePlayerChoice(options, diceArray.length - 1);
  }

  static playerThrow() {
    const options = `0: 0\n1: 1\n2: 2\n3: 3\n4: 4\n5: 5\nx: exit\n?: help`;
    return this.handlePlayerChoice(options, 5);
  }
}

module.exports = Player;
