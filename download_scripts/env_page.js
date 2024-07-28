const fs = require('fs');
const path = require('path');

async function generateEnv(projectName, userName) {

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

    const fileName = `.env`;
    const envFilePath = path.join(downloadsDirectory, fileName);

    let envContent = "";
    envContent += `PORT=8000\n`;
    envContent += `MONGO_URI=mongodb://0.0.0.0:27017/${projectName}\n`;
    envContent += `PEPPER="randompepper"\n`;
    envContent += `JWT_SECRET="${userName}'ssecret"\n`;

    fs.writeFileSync(envFilePath, envContent);
}


module.exports = generateEnv