const crypto = require("crypto");

const algorithm = process.env.FILE_ALGORITHM;
let key = process.env.FILE_ENCRYPT_SECRET_KEY;

key = crypto
  .createHash("sha256")
  .update(String(key))
  .digest("base64")
  .substr(0, 32);

// Decrypt function
const decrypt = (encryptedBuffer) => {
  const iv = encryptedBuffer.slice(0, 16); // Extract IV from encrypted buffer
  const encryptedData = encryptedBuffer.slice(16); // Extract encrypted data
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedData),
    decipher.final(),
  ]);
  return decrypted;
};

module.exports = { decrypt };
