const fs = require('fs');
const path = require('path');
async function generateMiddlewares() {
    // Get the parent directory of the current directory
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

    // Define the path for the generated_files directory within the Downloads directory
    const middlewaresDirectory = path.join(downloadsDirectory, 'middlewares');

    // Create the generated_files directory if it doesn't exist
    if (!fs.existsSync(middlewaresDirectory)) {
        fs.mkdirSync(middlewaresDirectory, { recursive: true });
        console.log(`Directory created: ${middlewaresDirectory}`);
    } else {
        console.log(`Directory already exists: ${middlewaresDirectory}`);
    }

    console.log(`Generated files will be stored in: ${middlewaresDirectory}`);

    await generateAuthenticateMiddleware(middlewaresDirectory);
    await generateValidateMiddleware(middlewaresDirectory)
}

async function generateValidateMiddleware(directory){
    let middlewareString = `const express = require("express");
let regex = {
    email : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
    password:/^[a-zA-Z0-9]{6,}$/
}
const validate = (type,value) => {
    if(type=="email") return regex.email.test(value);
    if(type=="password")return regex.password.test(value)
}
module.exports = {
    validate
};
  `
  const validatePath = path.join(directory, "validate.js")
  fs.writeFileSync(validatePath, middlewareString)
}

async function generateAuthenticateMiddleware(directory) {

    let middlewareString = `
        const jwt = require('jsonwebtoken');

        const checkIfSuperAdmin = async (req) => {
        const token = req.headers['authorization'];
        if (token == null || !token || token == undefined) {
            return false;
        }

        if (!token.startsWith('Bearer ')) {
            return false;
        }
        const access_token = token.split('Bearer ')[1];
        const decoded = await decodeToken(access_token);
        if (!decoded) {
            console.log("sending session expired");
            return false;
        }
        return decoded.userType === "super_admin";
        }

        const checkAuthorizationHeaders = async (req, res, next) => {
        const token = req.headers['authorization'];
        if (token == null || !token || token == undefined) {
            res.status(403).send({ message: "Token is missing" });
            return;
        }

        if (!token.startsWith('Bearer ')) {
            console.log("returning false");
            return res.status(500).send({ message: "Token not found" });
            return false;
        }
        const access_token = token.split('Bearer ')[1];
        const decoded = await decodeToken(access_token);
        if (!decoded) {
            console.log("sending session expired");
            return res.status(500).send({ message: 'Session Expired! Please login again' })
        }

        req.access_token = await decodeToken(access_token);
        console.log("access token is", req.access_token);
        if (!req.access_token) {
            return res.status(500).send({ message: 'Session Expired! Please login again' });
        }
        // return true;

        next();
        }


        const authorizeUser = (permission_key) => async (req, res, next) => {
        const userType = req.access_token.userType;
        if (userType === "super_admin") {
            return next();
        }

        try {
            const permissionsModule = await import('../utils/permissions');
        const validPermissions = permissionsModule[\`\${userType}\`];
            if (!validPermissions) {
            return res.status(403).json({ error: "Unauthorized user type" });
            }
            if(validPermissions.includes(permission_key)){
            return next();
            }
            else{
            return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Server error" });
        }
        };


        const decodeToken = async (token, accessType = null) => {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded success");
            return decodedToken;
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return false;
        }
        };
        module.exports = {
        checkAuthorizationHeaders,
        checkIfSuperAdmin,
        authorizeUser
        }`
    const authenticatePath = path.join(directory, "authenticate.js")
    fs.writeFileSync(authenticatePath, middlewareString)
}

module.exports=generateMiddlewares