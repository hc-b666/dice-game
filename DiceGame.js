const HMACCalculator = require('./HMACCalculator');
const RandomGenerator = require('./RandomGenerator');
const Player = require('./Player');

class DiceGame {
  constructor(dices) {
    this.dices = dices;
    this.isPlayer1 = false;
    this.plDice = null;
    this.pcDice = null;
    this.plThrow = null;
    this.pcThrow = null;
  }

  determineFirstMove() {
    console.log("Let's determine who makes the first move.");

    const { pcChoice, key, hmac } = HMACCalculator.getKeyAndHmac(2);
    console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);

    let plChoice;
    do {
      plChoice = Player.guessFirstMove();
    } while (plChoice === 'help' || plChoice === '');

    const computerResponse = `My selection: ${pcChoice} (Key=${key.toString('hex')}).`;

    if (plChoice === pcChoice) {
      this.isPlayer1 = true;
      console.log(computerResponse);
    } else {
      console.log(computerResponse);
    }
  }

  chooseDice() {
    if (this.isPlayer1) {
      this.choosePlayerDice();
      this.chooseComputerDice();
    } else {
      this.chooseComputerDice();
      this.choosePlayerDice();
    }
  }

  choosePlayerDice() {
    let plDiceIdx;
    do {
      plDiceIdx = Player.getPlayerDiceChoice(this.dices);
    } while (plDiceIdx === 'help' || plDiceIdx === '');

    this.plDice = this.dices[plDiceIdx];
    this.dices = this.dices.filter((_, i) => i !== plDiceIdx);
    console.log(`You choose the [${this.plDice.vals.join(', ')}] dice.`);
  }

  chooseComputerDice() {
    const pcDiceIdx = RandomGenerator.generateRandomNumber(this.dices.length);
    this.pcDice = this.dices[pcDiceIdx];
    this.dices = this.dices.filter((_, i) => i !== pcDiceIdx);
    console.log(this.isPlayer1 ? `I choose the [${this.pcDice.vals.join(', ')}] dice.` : `I make the first move and choose the [${this.pcDice.vals.join(', ')}] dice.`);
  }

  playerTurn() {
    console.log("It's time for your throw.");
    const { pcChoice, key, hmac } = HMACCalculator.getKeyAndHmac(6);
    console.log(`I selected a random value in the range 0..5 (HMAC=${hmac}).`);
    console.log('Add your number module 6');

    let plChoice;
    do {
      plChoice = Player.playerThrow();
    } while (plChoice === 'help' || plChoice === '');

    console.log(`My number is ${pcChoice} (KEY=${key.toString('hex')}).`);
    const mod = (plChoice + pcChoice) % 6;
    console.log(`The result is ${plChoice} + ${pcChoice} = ${mod} (mod 6).`);
    this.plThrow = this.plDice.vals[mod];
    console.log(`Your throw is ${this.plThrow}.`);
  }

  computerTurn() {
    console.log("It's time for my throw.");
    const { pcChoice, key, hmac } = HMACCalculator.getKeyAndHmac(6);
    console.log(`I selected a random value in the range 0..5 (HMAC=${hmac}).`);
    console.log('Add your number module 6');
    let plChoice;
    do {
      plChoice = Player.playerThrow();
    } while (plChoice === 'help' || plChoice === '');

    console.log(`My number is ${pcChoice} (KEY=${key.toString('hex')}).`);
    const mod = (plChoice + pcChoice) % 6;
    console.log(`The result is ${plChoice} + ${pcChoice} = ${mod} (mod 6).`);
    this.pcThrow = this.pcDice.vals[mod];
    console.log(`My throw is ${this.pcThrow}.`);
  }

  compareThrows() {
    if (this.pcThrow === this.plThrow) {
      console.log(`It's a draw (${this.plThrow} = ${this.pcThrow}).`);
    } else if (this.pcThrow > this.plThrow) {
      console.log(`I win (${this.plThrow} < ${this.pcThrow}).`);
    } else {
      console.log(`You win (${this.plThrow} > ${this.pcThrow}).`);
    }
  }

  play() {
    if (this.isPlayer1) {
      this.playerTurn();
      this.computerTurn();
    } else {
      this.computerTurn();
      this.playerTurn();
    }

    this.compareThrows();
  }
}

module.exports = DiceGame;
