const fs = require('fs');
const path = require('path');

async function generateGitIgnore() {
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

    const fileName = '.gitignore';
    const gitIgnoreFilePath = path.join(downloadsDirectory, fileName);

    const gitIgnoreContent = `/node_modules
node_modules
.env`

    fs.writeFileSync(gitIgnoreFilePath,gitIgnoreContent);

}

module.exports = generateGitIgnore