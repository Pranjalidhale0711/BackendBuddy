var fs = require('fs');
const path = require('path');
async function generatePermissions(validPermissions, roles,restrictedRoles) {

    let roleArray = [];
    let roleNames = [];
    function addRole(role, values) {
        const dynamicVariableName = `${role.toUpperCase()}`;
        roleArray[dynamicVariableName] = values;
    }
    for (let i = 0; i < roles.length; i++) {
        addRole(roles[i].name, roles[i].permissions);
        roleNames.push(roles[i].name);
    }
    const permissionsAsString = validPermissions.map(permission => `"${permission}"`);
    const restrictedRolesString = restrictedRoles.map(role => `"${role}"`);
    const roleNamesString = roleNames.map(role=>`"${role}"`)
    let longBlockOfCode = `exports.PERMISSIONS = [${permissionsAsString.join(', ')}]; \n`
    longBlockOfCode+=`exports.ROLES = [${roleNamesString.join(', ')}] \n`;
    for (let key in roleArray) {
        let rolePermissions = roleArray[key].map(permission => `"${permission}"`);
        longBlockOfCode += `exports.${key} = [${rolePermissions.join(', ')}]; \n`
    }
    longBlockOfCode += `exports.RESTRICTED_ROLES = [${restrictedRolesString.join(', ')}]; \n`
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
    const permissionDirectory = path.join(downloadsDirectory, 'utils');

    // Create the generated_files directory if it doesn't exist
    if (!fs.existsSync(permissionDirectory)) {
        fs.mkdirSync(permissionDirectory, { recursive: true });
        console.log(`Directory created: ${permissionDirectory}`);
    } else {
        console.log(`Directory already exists: ${permissionDirectory}`);
    }
    const permissionsPath = path.join(permissionDirectory, "permissions.js")
    fs.writeFileSync(permissionsPath, longBlockOfCode)


    return { parentDirectory }
}

module.exports=generatePermissions