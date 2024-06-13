const fs = require('fs');
const path = require('path');

async function generateConnect() {

    const parentDirectory = path.join(__dirname, '..');

    // Define the path for the Downloads directory in the parent directory
    const downloadsDirectory = path.join(parentDirectory, 'Downloads');

    // Create the Downloads directory if it doesn't exist
    if (!fs.existsSync(downloadsDirectory)) {
        fs.mkdirSync(downloadsDirectory, { recursive: true });
        console.log(`Directory created: ${downloadsDirectory}`);
    } else {
        console.log(`Directory already exists: ${downloadsDirectory}`);
    }

    const fileName = 'connect.js';
    const connectFilePath = path.join(downloadsDirectory,fileName);

    const connectContent = `const mongoose = require("mongoose");

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

module.exports = connect;`;

    fs.writeFileSync(connectFilePath, connectContent);
}

module.exports = generateConnect;
