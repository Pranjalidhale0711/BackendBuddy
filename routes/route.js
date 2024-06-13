const express = require("express");
const router = express.Router();
const {register,login, fetchUser} = require("../controllers/auth");
const {checkAuthorizationHeaders} = require("../middlewares/authenticate");
const { newProject, addPermission, deletePermission, deleteProject, getAllProjects, getProjectInfo, getAllPermisisons, downloadProject } = require("../controllers/project");
const {newRole, deleteRole, updateRole } = require("../controllers/role");
const {createSchema, updateSchema, deleteSchema} = require("../controllers/schemaDefine");

//auth routes
router.post("/auth/register",register);
router.post("/auth/login",login);
router.get("/auth/fetchUser",checkAuthorizationHeaders ,fetchUser);


//project routes
router.post("/project/new",checkAuthorizationHeaders, newProject);
router.post("/project/addPermission",checkAuthorizationHeaders,addPermission)
router.delete("/project/deletePermission",checkAuthorizationHeaders,deletePermission)
router.delete("/project/deleteProject",checkAuthorizationHeaders,deleteProject);
router.get("/project/getProjects", checkAuthorizationHeaders,getAllProjects)
router.get("/project/getProjectInfo/:projectId", checkAuthorizationHeaders,getProjectInfo);
router.get("/project/getPermissions/:projectId", checkAuthorizationHeaders,getAllPermisisons);
router.get("/project/:projectId/download",checkAuthorizationHeaders,downloadProject)


//role routes
router.post("/role/new", checkAuthorizationHeaders, newRole)
router.delete("/role/deleteRole",checkAuthorizationHeaders,deleteRole)
router.patch("/role/update",checkAuthorizationHeaders,updateRole)


// schema routes
router.post("/schema/new", checkAuthorizationHeaders, createSchema)
router.delete("/schema/deleteSchema", checkAuthorizationHeaders, deleteSchema)
router.patch("/schema/updateSchema", checkAuthorizationHeaders, updateSchema)

module.exports = router;