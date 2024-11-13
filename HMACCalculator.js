const crypto = require("crypto");

class HMACCalculator {
  static generateKey() {
    return crypto.randomBytes(32);
  }

  static calculateHMAC(key, message) {
    const hmac = crypto.createHmac("sha3-256", key);
    hmac.update(message);
    return hmac.digest("hex");
  }
}

module.exports = HMACCalculator;
