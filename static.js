const RESET = "\u001b[0m";
const BLACK = "\u001b[30m";
const RED = "\u001b[31m";
const GREEN = "\u001b[32m";
const YELLOW = "\u001b[33m";
const BLUE = "\u001b[34m";
const MAGENTA = "\u001b[35m";
const CYAN = "\u001b[36m";

const DicesLessThanThree = "Error: You must provide at least 3 sets of dice. Example: node dice-game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3";

module.exports = {
  COLORS: {
    RESET,
    BLACK,
    RED,
    GREEN,
    YELLOW,
    BLUE,
    MAGENTA,
    CYAN,
  },
  TEXTS: {
    DicesLessThanThree,
  },
};
