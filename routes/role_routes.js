const express = require('express');
const router = express.Router();
const checkAuthorization=require("../middlewares/authenticate.js");
const {addRole, deleteRole, updateRole, getRole}=require("../controllers/role_controllers.js");

router.post("/addRole",checkAuthorization,addRole);
router.post("/deleteRole",checkAuthorization,deleteRole);
router.post("/updateRole",checkAuthorization,updateRole);
router.post("/getRole",checkAuthorization,getRole);

module.exports= router;