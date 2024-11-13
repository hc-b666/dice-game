const crypto = require("crypto");

class RandomGenerator {
  static generateRandomNumber(range) {
    const randomBuffer = crypto.randomBytes(4);
    const randomNum = randomBuffer.readUInt32BE(0) % range;
    return randomNum;
  }
}

module.exports = RandomGenerator;