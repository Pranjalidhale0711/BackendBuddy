const fs = require('fs');
const path = require('path');

async function generateApp() {

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

    const fileName = 'app.js';
    const appFilePath = path.join(downloadsDirectory, fileName);

    const appContent = `const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./connect");
const routes = require("./routes/route");
    
dotenv.config();
    
connect(process.env.MONGO_URI);
    
// Using middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use("/api/v1", routes);
    
    
//Starting server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(\`Server running at port \${PORT}.\`);
});`;

    // Write the content to the app.js file
    fs.writeFileSync(appFilePath, appContent);

}

module.exports = generateApp;