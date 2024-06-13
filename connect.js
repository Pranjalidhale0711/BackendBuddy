const mongoose = require("mongoose");

// Connecting to database via mongoose
const connect = async (uri) => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri)
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((error) => {
      console.log("Error connecting to database.", error);
    });
};

module.exports = connect;