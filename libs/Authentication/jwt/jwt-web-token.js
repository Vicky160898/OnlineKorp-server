require("dotenv").config();
const jwt = require("jsonwebtoken");

const signToken = async (payload) => {
  const { expiresIn, privateKEY } = process.env;
  return new Promise((resolve, reject) => {
    const signOptions = {
      expiresIn: expiresIn || "1h",
      //   algorithm: "RS256",
    };

    jwt.sign(payload, privateKEY, signOptions, function (err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { signToken };
