const express = require('express');
const checkAuthorization = require('../middlewares/authenticate');
const router = express.Router();
const {createSchema, deleteSchema, updateSchema, getSchemas}=require("../controllers/schema_controller");

router.post("/createSchema",checkAuthorization,createSchema);
router.post("/deleteSchema",checkAuthorization,deleteSchema);
router.post("/updateSchema",checkAuthorization,updateSchema);
router.post("/getSchemas",checkAuthorization,getSchemas);

module.exports=router