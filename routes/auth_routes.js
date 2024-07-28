const express = require('express')
const router = express.Router()
const {register}=require("../controllers/auth_countrollers")
const {login,addProject,deleteProject}=require("../controllers/auth_countrollers")
const checkAuthorization=require("../middlewares/authorize");

router.post("/register", register);
router.post("/login",login);
router.post("/addProject",checkAuthorization, addProject);
router.post("/deleteProject",checkAuthorization,deleteProject);

module.exports = router;