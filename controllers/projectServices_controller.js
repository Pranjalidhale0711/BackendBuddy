const express = require("express");
const Project = require("../models/project_models")
const dotenv = require("dotenv");
const { ObjectId } = require('mongodb');
const axios = require("axios");
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const {generateSchemaFiles,generateProfileSchema}=require("../download_scripts/schema_page");
const generateControllers=require("../download_scripts/controller_page");
const generateRoutes=require("../download_scripts/routes_page");
const generatePermissions=require("../download_scripts/permissions_page");
const generateMiddlewares=require("../download_scripts/middleware_page")
const generateEnv=require("../download_scripts/env_page");
const generateGitIgnore=require("../download_scripts/gitgnore");
const generateConnect=require("../download_scripts/connect_page");
const {generateAppPage}=require("../download_scripts/app_page");
const generatePackageJson=require("../download_scripts/packageJson_page");
const {MakeRepository}=require("../helper/github_helper");
const rimraf = require('rimraf');
const path = require('path');

dotenv.config();

const createProject = async (req, res) => {
  const { name } = req.body;

  const userid = req.access_token.id;
  const token = req.headers["authorization"];
  try {
    const newproject = await Project.create({
      name: name,
      userId: userid,
      permissions: [],
      roles: [],
      restrictedRoles: [],
      schemas: [],
      githubUrl: " ",
      repoName: " ",
    });
    console.log(process.env.AUTH_SERVICE_URL);
    try {
      await axios.post(
        `${process.env.AUTH_SERVICE_URL}/addProject`,
        { userId: userid, projectId: newproject._id },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res
        .status(200)
        .json({ message: "Project created", id: newproject._id });
    } catch (e) {
      return res.status(500).json({ message: "Internal error" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal error" });
  }
};

const deleteProject = async (req, res) => {
  const { name } = req.body;
  const getproj = await Project.find({ name: name });
  console.log(getproj);
  const userid = req.access_token.id;
  const token = req.headers["authorization"];
  try {
    await Project.deleteOne({ _id: getproj[0]._id });
    try {
      await axios.post(
        `${process.env.AUTH_SERVICE_URL}/deleteProject`,
        { userId: userid, projectId: getproj[0]._id },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.status(200).json({ message: "Project deleted" });
    } catch (e) {
      return res.status(500).json({ message: "Internal error" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Project does not exists" });
  }
};
const addPermission = async (req, res) => {
  const { permissions, projectId } = req.body;
  if (projectId == null || projectId == undefined || !projectId) {
    return res.status(401).json({ message: "need project id" });
  }
  try {
    const project = await Project.findById(projectId);
    if (!project || project == null || project == undefined) {
      return res.status(401).json({ message: "Project not found" });
    }
    project.permissions = permissions;
    await project.save();
    return res.status(200).json({ message: "Permission added " });
  } catch (e) {
    return res.status(500).json({ message: "Internal error" });
  }
};
const deletePermission = async (req, res) => {
  const { permissionName, projectId } = req.body;
  if (projectId == null || projectId == undefined || !projectId) {
    return res.status(401).json({ message: "need project id" });
  }
  if (
    permissionName == null ||
    permissionName == undefined ||
    !permissionName
  ) {
    return res.status(401).json({ message: "need permissionname" });
  }
  try {
    const project = await Project.findById(projectId);
    if (!project || project == null || project == undefined) {
      return res.status(401).json({ message: "Project not found" });
    }
    const temppermission = [];
    project.permissions.map((permission) => {
      if (permission != permissionName) {
        // console.log(permission);
        // console.log(permissionName);
        temppermission.push(permission);
      }
    });
    project.permissions = temppermission;
    await project.save();
    return res.status(200).json({ message: "Permission deleted " });
  } catch (e) {
    return res.status(500).json({ message: "Internal error" });
  }
};


const addRole = async (req, res) => {
  const { roleId, isRestricted, name, projectId } = req.body;
  console.log("role id is ",projectId);
  if (name == null || name == undefined) {
    return res.status(500).json({ message: "Please provide name" });
  }
  const getProject =await  Project.findById(projectId);
  console.log(getProject)
  if (getProject == null || getProject == undefined) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  try {
    if (isRestricted) {
  getProject.restrictedRoles.push(name);
    }
    getProject.roles.push(roleId);
    await getProject.save();
    return res.status(200).json({ message: "Role added in Project" });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};


const deleteRole=async(req,res)=>{
  const { roleId, name, projectId } = req.body;
  const getProject= await Project.findById(projectId);
  console.log(getProject);
  if(getProject==null || getProject==undefined || roleId==null)
  {
    return res.status(500).json({message:"Role does not exists"})
  }
  try{
    const tempRestrictedRoles=[];
    getProject.restrictedRoles.map((restricted)=>{
      if(restricted!==name)
      {
        tempRestrictedRoles.push(restricted);
      }
    })
    getProject.restrictedRoles=tempRestrictedRoles;
    const tempRoles=[];
    getProject.roles.map((Roles)=>{
      if (!Roles.equals((roleId))) {
        tempRoles.push(Roles);
    }
    })
    getProject.roles=tempRoles;
    await getProject.save();
    console.log(getProject);
    return res.status(200).json({message:"Role deleted successfully"})
  }catch(e)
  {
    return res.status(500).json({message:"Internal Error"})
  }
 

}

const addSchema=async(req,res)=>{
  const {name,schemaId,projectId}=req.body;
  console.log("heeeee")
  if (!projectId || projectId == null || projectId == undefined) {
    return res.status(401).json({ message: "need Project ID" })
}
try{
  const project = await Project.findById(projectId);
  if (!project || project == null || project == undefined) {
      return res.status(401).json({ message: "project not found" })
  }
  if (!project.permissions.includes(`create${name}`)) {
      project.permissions.push(`create${name}`);
  }
  if (!project.permissions.includes(`update${name}`)) {
      project.permissions.push(`update${name}`);
  }
  if (!project.permissions.includes(`delete${name}`)) {
      project.permissions.push(`delete${name}`);
  }
  if (!project.permissions.includes(`read${name}`)) {
      project.permissions.push(`read${name}`);
  }
  project.schemas.push(schemaId);
  console.log("herrree");
  await project.save();
  return res.status(200).json({ message: "Ok" });
}catch(e)
{
  return res.status(500).json({ message: "Internal Error" });
}



}
const deleteSchema=async(req,res)=>{
  const {schemaId,projectId,name}=req.body
  try{
    if (!projectId || projectId == null || projectId == undefined) {
      return res.status(401).json({ message: "need Project ID" })
  }

  const project = await Project.findById(projectId);
  console.log("heree");
  let schemaPermissions = [`create${name}`, `update${name}`, `delete${name}`, `read${name}`];
  let currentPermissions = project.permissions;
  currentPermissions = currentPermissions.filter(permission => !schemaPermissions.includes(permission));
  let tempSchemas = [];
  for (let i = 0; i < project.schemas.length; i++) {
      if (!project.schemas[i].equals(schemaId)) {
          tempSchemas.push(project.schemas[i]);
      }
  }
  project.schemas = tempSchemas;
  project.permissions = currentPermissions
  await project.save();
  return res.status(200).json({ message: "Schema deleted " });
  }catch(e)
  {
    return res.status(500).json({ message: "Internal error" });
  }
}
const makeControllers = async (schemas) => {

  schemas.map(async (schema) => {
      await generateControllers(schema);
  });
};
const submit=async(req,res)=>{
  const user = await req.access_token;
   const token = req.headers['authorization'];
   const projectId = req.params.projectId;
   const project = await Project.findById(projectId);
  //  console.log(project);
  let schemas = project.schemas;
  let roles = project.roles;
  // console.log(token);
  try{
    console.log(process.env.ROLE_SERVICE_URL);
    try {
      const res = await axios.post(`${process.env.ROLE_SERVICE_URL}/getRole`, {
         roleIds:roles
      }, {
          headers: { Authorization: token }
      });
      // console.log(res.data)
      roles = res.data.roleDetails;
      
  } catch (error) {
      console.log("Error in role service", error);
      return done(new Error("Error communicating with role service"));
  }
  try {
    const res = await axios.post(`${process.env.SCHEMA_SERVICE_URL}/getSchemas`, {
       schemaIds:schemas
    }, {
        headers: { Authorization: token }
    });
    schemas = res.data.schemaDetails;
  } catch (error) {
    console.log("Error in schema service", error);
    return done(new Error("Error communicating with schema service"));
  }
  console.log(schemas);
  await generateSchemaFiles(schemas);
  await makeControllers(schemas);
  await generateRoutes(schemas);
  await generatePermissions(project.permissions, roles, project.restrictedRoles);
  await generateProfileSchema();
  await generateMiddlewares();
  await generateEnv(project.name, user.userName);
  await generateConnect();
  await generateAppPage();
  await generateGitIgnore();
  await generatePackageJson(project.name);
  let repoName = "";
  let githubUrl = "";
  let alreadyCreated = false;
  console.log(project.githubUrl);
  console.log(project.repoName);
  if(project.githubUrl== " " && project.repoName == " " || project.githubUrl==null && project.repoName ==null){
    console.log("heeeereee");
    const { createdRepoName, createdGithubUrl } = await MakeRepository();
    repoName=createdRepoName
    githubUrl = createdGithubUrl;
    console.log(repoName);
    console.log(githubUrl)
  }
  else{
    alreadyCreated=true;
    repoName=project.repoName;
    githubUrl=project.githubUrl;
  }
  const exactPath = path.join(process.cwd(), 'Downloads');
  console.log("URL:");
  console.log("Exact path:",exactPath);
  const url = `https://BackendBuddy07:${process.env.GITHUB_TOKEN}@github.com/Pranjalidhale0711/${repoName}.git`;
  console.log("hiii");
  try {
      const gitCommands = [
          'git init',
          'git add .',
          `git commit -m ${alreadyCreated?'"Changes updated"':'"Initial commit"'}`,
          'git branch -M main',
          `git remote add origin ${url}`,
          'git push -u origin main --force',
      ];
      //req1 req2

      for (const command of gitCommands) {
          const { stdout, stderr } = await execAsync(command, { cwd: exactPath });
          console.log('Command:', command);
          console.log('stdout:', stdout);
          console.error('stderr:', stderr);
      }
      
      if(!alreadyCreated){
          try {
              project.githubUrl= githubUrl;
              project.repoName=repoName;
              await project.save();
          } catch (error) {
              if (fs.existsSync(exactPath)) {
                  console.log(`Directory ${exactPath} exists. Deleting...`);
                  rimraf.sync(exactPath);
                  console.log(`Directory ${exactPath} deleted.`);
              } else {
                  console.log(`Directory ${exactPath} does not exist.`);
              }
              return done(new Error("Error executing git commands"));
          }
      }

      rimraf.sync(exactPath);


  } catch (error) {
      console.error('Error executing git commands:', error);
      if (fs.existsSync(exactPath)) {
          console.log(`Directory ${exactPath} exists. Deleting...`);
          rimraf.sync(exactPath);
          console.log(`Directory ${exactPath} deleted.`);
      } else {
          console.log(`Directory ${exactPath} does not exist.`);
      }
      return done(new Error("Error executing git commands"));
  }
   return res.status(200).json({message:"Successfull"})
  }
  catch(e)
  {
    return res.status(500).json(e)
  }
 




}


module.exports = {
  createProject,
  deleteProject,
  addPermission,
  deletePermission,
  addRole,
  deleteRole,
  addSchema,
  deleteSchema,
  submit
};


