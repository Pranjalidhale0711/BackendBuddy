const fs = require('fs');
const path = require('path');

async function generateSchemaFiles(schemas) {
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
  const modelDirectory = path.join(downloadsDirectory, 'models');

  // Create the generated_files directory if it doesn't exist
  if (!fs.existsSync(modelDirectory)) {
    fs.mkdirSync(modelDirectory, { recursive: true });
    console.log(`Directory created: ${modelDirectory}`);
  } else {
    console.log(`Directory already exists: ${modelDirectory}`);
  }

  console.log(`Generated files will be stored in: ${modelDirectory}`);

  console.log("schemas are", schemas);
  schemas.forEach(schema => {
    makeSchema(schema, modelDirectory);
  });


  return { parentDirectory };
}

function makeSchema(schema, directory) {
  const schemaFileName = `${schema.name.toLowerCase()}Schema.js`;
  const schemaFilePath = path.join(directory, schemaFileName);
  let schemaCode = `const mongoose = require('mongoose');\n\n`;
  schemaCode += `const ${schema.name}Schema = new mongoose.Schema(\n{\n`;
  schemaCode += schemaString(schema)
  schemaCode += `});\n\n`;
  schemaCode += `module.exports = mongoose.model('${schema.name}', ${schema.name}Schema);\n`;


  fs.writeFileSync(schemaFilePath, schemaCode);
}
function schemaString(schema) {
  let schemaCode = "";
  let keys = [];
  schema?.fields?.forEach(field => {
    keys.push(field.fieldName);
    if (field.dataType !== "Array") {
      schemaCode += `    ${field.fieldName}: { \n`;
      schemaCode += `        type: ${field.dataType},\n`;
      schemaCode += `        required: ${field.isRequired},\n`;
      schemaCode += `        unique: ${field.isUnique}\n`;
      schemaCode += `    },\n`;
    }
    else {
      schemaCode += `${field.fieldName} : [\n{ \n`
      schemaCode += addContent(field.content);
      schemaCode += `}\n],\n`
    }
  });
  return schemaCode;
}
function addContent(content) {
  let schemaCode = "";
  content.forEach(field => {
    if (field.dataType !== "Array") {
      schemaCode += `  \n   ${field.fieldName}: { \n`;
      schemaCode += `        type: ${field.dataType},\n`;
      schemaCode += `        required: ${field.isRequired},\n`;
      schemaCode += `        unique: ${field.isUnique}\n`;
      schemaCode += `    \n},\n`;
    }
    else {
      schemaCode += ` ${field.fieldName} : [\n{ \n`
      schemaCode += addContent(field.content);
      schemaCode += `}\n]\n,\n`
    }
  })
  return schemaCode;
}

async function generateProfileSchema() {
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
  const modelDirectory = path.join(downloadsDirectory, 'models');

  // Create the generated_files directory if it doesn't exist
  if (!fs.existsSync(modelDirectory)) {
    fs.mkdirSync(modelDirectory, { recursive: true });
    console.log(`Directory created: ${modelDirectory}`);
  } else {
    console.log(`Directory already exists: ${modelDirectory}`);
  }

  console.log(`Generated files will be stored in: ${modelDirectory}`);

  let profileCode = `const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Must provide Email"],
        unique: [true, "Email should be unique."]
    },
    password: {
        type: String,
        required: [true, "Must provide password"],
        minlength: [6, "Length of password should be atleast 6 characters."]
    },
    userType:{
        type:String,
        required: [true, "Must provide user type"],
    }
})
module.exports = mongoose.model("Profile", schema);`
  const schemaFilePath = path.join(modelDirectory, "profile.js");
  fs.writeFileSync(schemaFilePath, profileCode);

}

module.exports = {generateSchemaFiles,generateProfileSchema}