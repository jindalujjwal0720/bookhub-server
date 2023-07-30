const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
};

/**
 * Connects to the database
 * @returns {Promise<void>}
 */
const connectDB = () =>
  mongoose
    .connect(url, options)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log("MongoDB connection unsuccessful");
      console.log(err);
    });

module.exports = connectDB;
