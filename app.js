const DiceParser = require("./DiceParser");
const DiceGame = require("./DiceGame");
const Help = require("./Help");

let args = process.argv.slice(2);
if (args.length < 3) {
  console.log("Error: You must provide at least 3 sets of dice. Example: node dice-game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
  return;
}

try {
  const diceArray = DiceParser.parse(args);

  Help.assignDices(diceArray);
  
  const game = new DiceGame(diceArray);

  game.determineFirstMove();

  game.chooseDice();

  game.play();
} catch (error) {
  console.log(`Error: ${error.message}`);
}
