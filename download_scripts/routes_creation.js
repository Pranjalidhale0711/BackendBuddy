const fs = require('fs');
const path = require('path');

async function generateRoutes(schemas) {
  console.log('schema from routes is', schemas);

  // Define directory paths
  const parentDirectory = path.join(__dirname, '..');
  const downloadsDirectory = path.join(parentDirectory, 'Downloads');
  const routesDirectory = path.join(downloadsDirectory, 'routes');

  // Create directories if they don't exist
  if (!fs.existsSync(downloadsDirectory)) {
    fs.mkdirSync(downloadsDirectory, { recursive: true });
    console.log(`Directory created: ${downloadsDirectory}`);
  } else {
    console.log(`Directory already exists: ${downloadsDirectory}`);
  }

  if (!fs.existsSync(routesDirectory)) {
    fs.mkdirSync(routesDirectory, { recursive: true });
    console.log(`Directory created: ${routesDirectory}`);
  } else {
    console.log(`Directory already exists: ${routesDirectory}`);
  }

  console.log(`Generated files will be stored in: ${routesDirectory}`);

  // Generate auth route string
  let authRouteString = `const express = require("express");
const router = express.Router();\n
// auth routes
const { register, login } = require("../controllers/auth");
const { checkAuthorizationHeaders, authorizeUser } = require("../middlewares/authenticate");


router.post("/register", register);
router.post("/login", checkAuthorizationHeaders, login);
`;

  // Loop through schemas and generate routes
  schemas.forEach((schema) => {
    const schemaName = schema.name;
    const controllerName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1);
    authRouteString += `
    
// ${schemaName} routes
const { create${controllerName}, update${controllerName}, delete${controllerName}, get${controllerName}, getAll${controllerName} } = require('../controllers/${schemaName.toLowerCase()}');
// 
router.post("/${schemaName.toLowerCase()}/create", checkAuthorizationHeaders,authorizeUser("create${schemaName}") ,create${controllerName});
router.put("/${schemaName.toLowerCase()}/update/:id", checkAuthorizationHeaders,authorizeUser("update${schemaName}"), update${controllerName});
router.delete("/${schemaName.toLowerCase()}/delete/:id", checkAuthorizationHeaders, authorizeUser("delete${schemaName}"), delete${controllerName});
router.get("/${schemaName.toLowerCase()}/get/:id", checkAuthorizationHeaders, authorizeUser("read${schemaName}"), get${controllerName});
router.get("/${schemaName.toLowerCase()}/getAll", checkAuthorizationHeaders, authorizeUser("read${schemaName}"), getAll${controllerName});
`;
  });

  authRouteString += `
  
module.exports = router;
`;

  // Write auth routes to file
  const authRoutesPath = path.join(routesDirectory, "route.js");
  fs.writeFileSync(authRoutesPath, authRouteString);
}

module.exports = generateRoutes;
