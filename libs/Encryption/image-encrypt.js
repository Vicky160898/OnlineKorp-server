const crypto = require("crypto");

const algorithm = process.env.FILE_ALGORITHM;
let key = process.env.FILE_ENCRYPT_SECRET_KEY;

key = crypto
  .createHash("sha256")
  .update(String(key))
  .digest("base64")
  .substr(0, 32);

// Encrypt function
const encrypt = (buffer) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
  return encrypted;
};

module.exports = { encrypt };
