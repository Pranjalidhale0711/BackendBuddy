const fs = require('fs');
const path = require('path');

async function generatePackageJson(projectName) {
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

    const fileName = `package.json`;
    const packageJsonFilePath = path.join(downloadsDirectory, fileName);

    const packageJsonContent = `{
  "name": "${projectName.toLowerCase()}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "archiver": "^7.0.1",
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-validator": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.0",
    "nodemon": "^3.1.0"
  }
}
`

    fs.writeFileSync(packageJsonFilePath, packageJsonContent);
}

module.exports = generatePackageJson