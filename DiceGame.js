const HMACCalculator = require("./HMACCalculator");
const RandomGenerator = require("./RandomGenerator");
const Player = require("./Player");

class DiceGame {
  constructor(diceArray) {
    this.diceArray = diceArray;
    this.playerFirst = false;
    this.key = null;
    this.playerDice = null;
    this.computerDice = null;
    this.playerThrow = null;
    this.computerThrow = null;
  }

  determineFirstMove() {
    console.log("Let's determine who makes the first move.");

    this.key = HMACCalculator.generateKey();
    const computerChoice = RandomGenerator.generateRandomNumber(2);
    const hmac = HMACCalculator.calculateHMAC(this.key, computerChoice.toString());
    console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);
    
    let playerChoice = Player.guessFirstMove();
    while (playerChoice === "help") {
      playerChoice = Player.guessFirstMove();
    }

    const computerResponse = `My selection: ${computerChoice} (Key=${this.key.toString("hex")}).`;

    if (playerChoice === computerChoice) {
      this.playerFirst = true;
      console.log(computerResponse);
    } else {
      console.log(computerResponse);
    }
  }

  chooseDice() {
    if (this.playerFirst) {
      this.choosePlayerDice();
      this.chooseComputerDice();
    } else {
      this.chooseComputerDice();
      this.choosePlayerDice();
    }
  }

  choosePlayerDice() {
    let playerDiceIndex = Player.getPlayerDiceChoice(this.diceArray);
    while (playerDiceIndex === "help") {
      playerDiceIndex = Player.getPlayerDiceChoice(this.diceArray);
    }

    this.playerDice = this.diceArray[playerDiceIndex];
    this.diceArray = this.diceArray.filter((_, i) => i !== playerDiceIndex);
    console.log(`You choose the [${this.playerDice.values.join(", ")}] dice.`);
  }

  chooseComputerDice() {
    const computerDiceIndex = RandomGenerator.generateRandomNumber(this.diceArray.length);
    this.computerDice = this.diceArray[computerDiceIndex];
    this.diceArray = this.diceArray.filter((_, i) => i !== computerDiceIndex);
    console.log(this.playerFirst ? `I choose the [${this.computerDice.values.join(", ")}] dice.` : `I make the first move and choose the [${this.computerDice.values.join(", ")}] dice.`);
  }

  playerTurn() {
    console.log("It's time for your throw.");
    this.key = HMACCalculator.generateKey();
    const computerChoice = RandomGenerator.generateRandomNumber(6);
    const hmac = HMACCalculator.calculateHMAC(this.key, computerChoice.toString());
    console.log(`I selected a random value in the range 0..5 (HMAC=${hmac}).`);
    console.log("Add your number module 6");
    let playerChoice = Player.playerThrow();

    while (playerChoice === "help") {
      playerChoice = Player.playerThrow();
    }

    console.log(`My number is ${computerChoice} (KEY=${this.key.toString("hex")}).`);
    const mod = (playerChoice + computerChoice) % 6;
    console.log(`The result is ${playerChoice} + ${computerChoice} = ${mod} (mod 6).`);
    this.playerThrow = this.playerDice.values[mod];
    console.log(`Your throw is ${this.playerThrow}.`);
  }

  computerTurn() {
    console.log("It's time for my throw.");
    this.key = HMACCalculator.generateKey();
    const computerChoice = RandomGenerator.generateRandomNumber(6);
    const hmac = HMACCalculator.calculateHMAC(this.key, computerChoice.toString());
    console.log(`I selected a random value in the range 0..5 (HMAC=${hmac}).`);
    console.log("Add your number module 6");
    const playerChoice = Player.playerThrow();
    console.log(`My number is ${computerChoice} (KEY=${this.key.toString("hex")}).`);
    const mod = (playerChoice + computerChoice) % 6;
    console.log(`The result is ${playerChoice} + ${computerChoice} = ${mod} (mod 6).`);
    this.computerThrow = this.computerDice.values[mod];
    console.log(`My throw is ${this.computerThrow}.`);
  }

  compareThrows() {
    if (this.computerThrow === this.playerThrow) {
      console.log(`It's a draw (${this.playerThrow} = ${this.computerThrow}).`);
    } else if (this.computerThrow > this.playerThrow) {
      console.log(`I win (${this.playerThrow} < ${this.computerThrow}).`);
    } else {
      console.log(`You win (${this.playerThrow} > ${this.computerThrow}).`);
    }
  }

  play() {
    if (this.playerFirst) {
      this.playerTurn();
      this.computerTurn();
    } else {
      this.computerTurn();
      this.playerTurn();
    }

    this.compareThrows();
  }

  end() {
    console.log("Game over.");
    process.exit();
  }
}

module.exports = DiceGame;
