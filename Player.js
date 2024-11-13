const readlineSync = require('readline-sync');
const Help = require('./Help');
const STATIC = require('./static');

class Player {
  static getPlayerChoice() {
    const ans = readlineSync.question('Your selection: ');
    return ans;
  }

  static handlePlayerChoice(opts, max) {
    console.log(opts);
    const ans = this.getPlayerChoice();

    if (ans === 'x') {
      process.exit();
    } else if (ans === '?') {
      console.log(Help.getHelp());
      return 'help';
    }

    const ansNum = Number(ans);
    if (isNaN(ansNum) || ansNum < 0 || ansNum > max) {
      console.log(STATIC.COLORS.RED + 'Your entry is does not match to any of options' + STATIC.COLORS.RESET);
      return this.handlePlayerChoice(opts, max);
    }

    return ansNum;
  }

  static guessFirstMove() {
    const opts = `Try to guess my selection.\n0: 0\n1: 1\nx: exit\n?: help`;
    return this.handlePlayerChoice(opts, 1);
  }

  static getPlayerDiceChoice(dices) {
    let opts = 'Choose your dice:\n';
    dices.forEach((dice, i) => opts += `${i}: ${dice.vals.join(', ')}\n`);
    opts += 'x: exit\n?: help';

    return this.handlePlayerChoice(opts, dices.length - 1);
  }

  static playerThrow() {
    const opts = `0: 0\n1: 1\n2: 2\n3: 3\n4: 4\n5: 5\nx: exit\n?: help`;
    return this.handlePlayerChoice(opts, 5);
  }
}

module.exports = Player;
