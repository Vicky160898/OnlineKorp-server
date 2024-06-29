require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    console.log(`ℹ  Attempting database connection...`);
    const { MONGO_DB_URL } = process.env;
    const conn = await mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log(`✅  MongoDB connect on database.`);
    }
    return conn;
  } catch (error) {
    console.log(`❌  Failed: Error establishing database connection`);
    console.error(error);
    process.exit(1);
  }
};
