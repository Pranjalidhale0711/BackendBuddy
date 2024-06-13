const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

async function generateControllers(schema) {
    // await setup();

    //getting name
    const schemaName = schema.name;
    const keys = [];
    schema.keys.map((key) => {
        keys.push(key.keyName);
    })
    console.log("keys are", keys);

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
    const controllerDirectory = path.join(downloadsDirectory, 'controllers');

    // Create the generated_files directory if it doesn't exist
    if (!fs.existsSync(controllerDirectory)) {
        fs.mkdirSync(controllerDirectory, { recursive: true });
        console.log(`Directory created: ${controllerDirectory}`);
    } else {
        console.log(`Directory already exists: ${controllerDirectory}`);
    }

    console.log(`Generated files will be stored in: ${controllerDirectory}`);


    await makeControllers(controllerDirectory, schemaName, keys);
    await createAuthController(controllerDirectory);
    return { parentDirectory };
}

function makeControllers(directory, schemaName, keys) {

    const controllerFileName = `${schemaName.toLowerCase()}.js`;
    const controllerFilePath = path.join(directory, controllerFileName);
    const modelName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1);

    //making create controller

    let controllersCode = '// Generated controllers based on user input\n';
    controllersCode += `const mongoose = require("mongoose"); \n`;
    controllersCode += `const express = require("express"); \n`;
    controllersCode += `const ${modelName} = require('../models/${schemaName.toLowerCase()}Schema');\n\n`;
    controllersCode += `// CRUD operations for ${schemaName}\n`;
    controllersCode += `// Create Controller \n`;
    controllersCode += `const create${schemaName.charAt(0).toUpperCase() + schemaName.slice(1)} = async (req, res) => { \n`;
    controllersCode += `    const { `;
    keys.map((key, idx) => {
        if (idx !== keys.length - 1) {
            controllersCode += `${key}` + `, `;
            console.log(typeof key);
        } else {
            controllersCode += `${key}`;
            console.log(typeof key);
        }
    });
    controllersCode += ` } = req.body;\n`;
    controllersCode += `    try {\n`;
    controllersCode += `        const ${schemaName.toLowerCase()} = await ${modelName}.create({ `;
    keys.map((key, idx) => {
        controllersCode += `${key}`;
        if (idx !== keys.length - 1) {
            controllersCode += `, `;
        }
    })
    controllersCode += ` }) \n`;
    controllersCode += `        await ${schemaName.toLowerCase()}.save();\n`;
    controllersCode += `        res.status(201).json(${schemaName.toLowerCase()});\n`;
    controllersCode += `    } catch (error) {\n`;
    controllersCode += `        if (error instanceof mongoose.Error.ValidationError) {\n`;
    controllersCode += `            for (it in error.errors) {\n`;
    controllersCode += `                console.log(error.errors[it].message);
            }
            return res.status(400).send(error.message);
        }`
    controllersCode += ` console.error(error);\n`;
    controllersCode += `        res.status(500).json({'Server Error ': error.message});\n`;
    controllersCode += `    }\n`;
    controllersCode += `};\n\n`;



    //making update controller
    controllersCode += `// Update Controller \n`;
    controllersCode += `const update${schemaName.charAt(0).toUpperCase() + schemaName.slice(1)} = async (req, res) => { \n`;
    controllersCode += `    const _id=req.params.id;\n`;
    controllersCode += `    const { `;
    keys.map((key, idx) => {
        if (idx !== keys.length - 1) {
            controllersCode += `${key}` + `, `;
            console.log(typeof key);
        } else {
            controllersCode += `${key}`;
            console.log(typeof key);
        }
    });
    controllersCode += ` } = req.body;\n`;
    controllersCode += `    try {\n`;
    controllersCode += `        const ${schemaName.toLowerCase()} = await ${modelName}.findByIdAndUpdate( _id, { `;
    keys.map((key, idx) => {
        controllersCode += `${key}`;
        if (idx !== keys.length - 1) {
            controllersCode += `, `;
        }
    })
    controllersCode += ` },{new:true}) \n`;
    controllersCode += `        if (!${schemaName.toLowerCase()}) {
            return res.status(404).send('${schemaName.toLowerCase()} not found');
        }\n`
    controllersCode += `        await ${schemaName.toLowerCase()}.save();\n`;
    controllersCode += `        res.status(201).json(${schemaName.toLowerCase()});\n`;
    controllersCode += `    } catch (error) {\n`;
    controllersCode += `        if (error instanceof mongoose.Error.ValidationError) {\n`;
    controllersCode += `            for (it in error.errors) {\n`;
    controllersCode += `                console.log(error.errors[it].message);
            }
            return res.status(400).send(error.message);
        }`
    controllersCode += ` console.error(error);\n`;
    controllersCode += `        return res.status(500).json({'Server Error':error.message});\n`;
    controllersCode += `    }\n`;
    controllersCode += `};\n\n`;


    // making delete controller
    controllersCode += `// Delete Controller \n`;
    controllersCode += `const delete${schemaName.charAt(0).toUpperCase() + schemaName.slice(1)} = async (req, res) => { \n`;
    controllersCode += `    const _id=req.params.id;\n`;
    controllersCode += `    try {\n`;
    controllersCode += `        const ${schemaName.toLowerCase()} = await ${modelName}.findById(_id)`;
    controllersCode += `\n`;
    controllersCode += `        if (!${schemaName.toLowerCase()}) {
            return res.status(404).send('${schemaName.toLowerCase()} not found');
        }\n`
    controllersCode += `        await ${modelName}.deleteOne({_id: _id})\n`
    controllersCode += `        await ${schemaName.toLowerCase()}.save();\n`;
    controllersCode += `        res.status(201).json({message: "Deleted Successfully"});\n`;
    controllersCode += `    } catch (error) {\n`;
    controllersCode += `        if (error instanceof mongoose.Error.ValidationError) {\n`;
    controllersCode += `            for (it in error.errors) {\n`;
    controllersCode += `                console.log(error.errors[it].message);
            }
            return res.status(400).send(error.message);
        }`
    controllersCode += ` console.error(error);\n`;
    controllersCode += `        return res.status(500).json({'Server Error':error.message});\n`;
    controllersCode += `    }\n`;
    controllersCode += `};\n\n`;


    // making get by Id controller
    controllersCode += `// get by Id Controller \n`;
    controllersCode += `const get${schemaName.charAt(0).toUpperCase() + schemaName.slice(1)} = async (req, res) => { \n`;
    controllersCode += `    const _id=req.params.id;\n`;
    controllersCode += `    try {\n`;
    controllersCode += `        const ${schemaName.toLowerCase()} = await ${modelName}.findById(_id)`;
    controllersCode += `\n`;
    controllersCode += `        if (!${schemaName.toLowerCase()}) {
            return res.status(404).send('${schemaName.toLowerCase()} not found');
        }\n`
    controllersCode += `        res.status(201).json(${schemaName.toLowerCase()});\n`;
    controllersCode += `    } catch (error) {\n`;
    controllersCode += `        if (error instanceof mongoose.Error.ValidationError) {\n`;
    controllersCode += `            for (it in error.errors) {\n`;
    controllersCode += `                console.log(error.errors[it].message);
            }
            return res.status(400).send(error.message);
        }`
    controllersCode += ` console.error(error);\n`;
    controllersCode += `        return res.status(500).json({'Server Error':error.message});\n`;
    controllersCode += `    }\n`;
    controllersCode += `};\n\n`;


    // making getAll controller
    controllersCode += `// getAll Controller \n`;
    controllersCode += `const getAll${schemaName.charAt(0).toUpperCase() + schemaName.slice(1)} = async (req, res) => { \n`;
    controllersCode += `    try {\n`;
    controllersCode += `        const ${schemaName.toLowerCase()} = await ${modelName}.find({})`;
    controllersCode += `\n`;
    controllersCode += `        if (!${schemaName.toLowerCase()}) {
            return res.status(404).send('Nothing found !!');
        }\n`
    controllersCode += `        res.status(201).json(${schemaName.toLowerCase()});\n`;
    controllersCode += `    } catch (error) {\n`;
    controllersCode += `        if (error instanceof mongoose.Error.ValidationError) {\n`;
    controllersCode += `            for (it in error.errors) {\n`;
    controllersCode += `                console.log(error.errors[it].message);
            }
            return res.status(400).send(error.message);
        }`
    controllersCode += ` console.error(error);\n`;
    controllersCode += `        return res.status(500).json({'Server Error':error.message});\n`;
    controllersCode += `    }\n`;
    controllersCode += `};\n\n`;


    controllersCode += `module.exports = {\n`
    controllersCode += `    create${schemaName.charAt(0).toUpperCase() + schemaName.slice(1)},\n`
    controllersCode += `    update${schemaName.charAt(0).toUpperCase() + schemaName.slice(1)},\n`
    controllersCode += `    delete${schemaName.charAt(0).toUpperCase() + schemaName.slice(1)},\n`
    controllersCode += `    get${schemaName.charAt(0).toUpperCase() + schemaName.slice(1)},\n`
    controllersCode += `    getAll${schemaName.charAt(0).toUpperCase() + schemaName.slice(1)}\n`
    controllersCode += `}`

    fs.writeFileSync(controllerFilePath, controllersCode);
}

async function createAuthController(directory) {
    let authControllerString = `const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Profile = require('../models/profile')
const { validate } = require("../middlewares/validate");
const { checkIfSuperAdmin } = require("../middlewares/authenticate");
const Permissions = require("../utils/permissions")

const register = async (req, res) => {
    const { email, password, confirmPassword, userType } = req.body;
    if (Permissions.RESTRICTED_ROLES.includes(userType)) {
        const response = await checkIfSuperAdmin(req);
        if (response == false) {
            return res.status(401).json({ message: "You are not authorized to register" });
        }
    }
    if(!Permissions.ROLES.includes(userType)){
        return res.status(401).json({ message: "No such user type exists" });
    }
    //validators
    if (!validate("email", email)) {
        res.status(401).json({ message: "Invalid Email, Please check again" });
        return;
    }
    else if (!validate("password", password)) {
        res.status(401).json({ message: "Invalid Password, Please check again" });
        return;
    }
    else if (password != confirmPassword) {
        res.status(401).json({ message: "Password and Confirm Password does not match" });
        return;
    }

    //checking if already exsists
    const profile = await Profile.find({ email: email });
    if (profile.length) {
        res.status(400).json({ message: "Already Registered, Please Log in" });
        return;
    }

    //adding pepper to password
    const newPassword = password + process.env.PEPPER;
    //password hashing
    const hashedPassword = await bcrypt.genSalt(10).then(salt => bcrypt.hash(newPassword, salt))

    //storing in database
    Profile.create({ email: email, password: hashedPassword, userType: userType }).then(() => {
        return res.status(200).json({ message: "Registered successfully" })
    }).catch((error) => {
        console.log("error is", error)
        res.status(500).json({ message: "Something went wrong, please try again" });
        return;
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // validators
    if (!validate("email", email)) {
        res.status(401).json({ message: "Invalid Email, Please check again" });
        return;
    }
    else if (email === "" || password === null) {
        res.status(401).json({ message: "Must provide login credentials" });
        return;
    }

    // checking if user exists
    const profile = await Profile.findOne({ email: email });
    if (!profile) {
        res.status(404).json({ message: "User not found, Please register!" });
        return;
    }

    //adding pepper to password
    const newPassword = password + process.env.PEPPER;

    // comparing hashed password
    const validatePassword = await bcrypt.compare(newPassword, profile.password);
    if (!validatePassword) {
        res.status(401).json({ message: "Inavalid credentials, Please try again" });
        return;
    }

    // Generate JWT token
    const token = jwt.sign({
        id: profile._id,
        email: profile.email,
        userType: profile.userType
    },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Login Successful", data: token })

}

module.exports = {
    register,
    login
}`
    const authControllerPath = path.join(directory, "auth.js")
    fs.writeFileSync(authControllerPath, authControllerString)
}

module.exports = generateControllers


