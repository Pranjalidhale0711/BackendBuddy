
const fs = require('fs');
const path = require('path');


const generateAppPage=()=>{
    // ..reprensents to parent of current directory
    console.log("jjjjjjjjjjjokkok");
    const parentDirectory=path.join(__dirname,'..');
    const downloadDirectory=path.join(parentDirectory,'Downloads');
    if (!fs.existsSync(downloadDirectory)) {
        fs.mkdirSync(downloadDirectory, { recursive: true });
        console.log(`Directory created: ${downloadDirectory}`);
    } else {
        console.log(`Directory already exists: ${downloadDirectory}`);
    }
    const fileName = 'app.js';
    const appFilePath = path.join(downloadDirectory, fileName);

 const content=`const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/route");
    
dotenv.config();
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Database connected")
    })
// Using middlewares
app.use("/api/v1", routes);
app.use(express.json());
app.use(cors());
    
//Starting server
app.listen(PORT, () => {
 console.log(\`Server running at port \${PORT}.\`);
});`


fs.writeFileSync(appFilePath,content);

}

module.exports={generateAppPage};
