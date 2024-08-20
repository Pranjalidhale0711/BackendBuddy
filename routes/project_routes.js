const express = require('express');
const router = express.Router();
const {createProject,deleteProject,addPermission,deletePermission, addRole,deleteRole, addSchema, deleteSchema, submit, getAllProjects, getProjectInfo, getAllPermisisons}=require("../controllers/projectServices_controller");
const checkAuthorization =require("../middlewares/authenticate");


router.post("/createProject",checkAuthorization,createProject);
router.post("/deleteProject",checkAuthorization,deleteProject);
router.post("/addPermission",checkAuthorization,addPermission);
router.post("/deletePermission",checkAuthorization,deletePermission);
router.post("/addRole",checkAuthorization,addRole);
router.post("/deleteRole",checkAuthorization,deleteRole);
router.post("/addSchema",checkAuthorization,addSchema);
router.post("/deleteSchema",checkAuthorization,deleteSchema);
router.get("/download/:projectId",checkAuthorization,submit);
router.get("/getAll",checkAuthorization,getAllProjects);
router.get("/getAllPermissions/:projectId",checkAuthorization,getAllPermisisons);
router.get("/getAllInfo/:projectId",checkAuthorization,getProjectInfo);
module.exports= router;




