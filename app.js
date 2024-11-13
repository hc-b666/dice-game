const DiceParser = require('./DiceParser');
const DiceGame = require('./DiceGame');
const Help = require('./Help');
const STATIC = require('./static');

let args = process.argv.slice(2);
if (args.length < 3) {
  console.log(STATIC.COLORS.RED + STATIC.TEXTS.DicesLessThanThree + STATIC.COLORS.RESET);
  return;
}

try {
  const dices = DiceParser.parse(args);

  Help.assignDices(dices);

  const game = new DiceGame(dices);

  game.determineFirstMove();

  game.chooseDice();

  game.play();
} catch (err) {
  console.log(STATIC.COLORS.RED + `Error: ${err.message}` + STATIC.COLORS.RESET);
}
