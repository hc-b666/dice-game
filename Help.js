const AsciiTable = require('ascii-table');

class Help {
  static assignDices(dices) {
    this.dices = dices;
  }

  static calculateWinProbability(d1, d2) {
    let wins = 0;
    d1.vals.forEach((v1) => {
      d2.vals.forEach((v2) => {
        if (v1 > v2) {
          wins++;
        }
      });
    });
    return (wins / 36).toFixed(4);
  }

  static getHelp() {
    let table = new AsciiTable('Probability of the wins for the user:');
    let cols = this.dices.map((d) => d.vals.join(','));
    table.setHeading('User \\ Computer', ...cols);

    this.dices.forEach((d1, i) => {
      let r = [d1.vals.join(',')];
      this.dices.forEach((d2, j) => {
        if (i === j) {
          r.push(`- (${(1 / this.dices.length).toFixed(4)})`);
        } else {
          let prob = this.calculateWinProbability(d1, d2);
          r.push(prob);
        }
      });
      table.addRow(...r);
    });

    return table.toString();
  }
}

module.exports = Help;
