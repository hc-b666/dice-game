const crypto = require('crypto');
const RandomGenerator = require('./RandomGenerator');

class HMACCalculator {
  static generateKey() {
    return crypto.randomBytes(32);
  }

  static calculateHMAC(key, msg) {
    const hmac = crypto.createHmac('sha3-256', key);
    hmac.update(msg);
    return hmac.digest('hex');
  }

  static getKeyAndHmac(range) {
    const key = this.generateKey();
    const pcChoice = RandomGenerator.generateRandomNumber(range);
    const hmac = this.calculateHMAC(key, pcChoice.toString());
    return { pcChoice, key, hmac };
  }
}

module.exports = HMACCalculator;
