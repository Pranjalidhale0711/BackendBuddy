const express = require('express');
const checkAuthorization = require('../middlewares/authenticate');
const router = express.Router();
const {createSchema, deleteSchema, updateSchema, getSchemas, getAllSchemas, getSchemaInfo}=require("../controllers/schema_controller");

router.post("/createSchema/:projectId",checkAuthorization,createSchema);
router.post("/deleteSchema/:projectId/:schemaId",checkAuthorization,deleteSchema);
router.post("/updateSchema/:schemaId",checkAuthorization,updateSchema);
router.post("/getSchemas",checkAuthorization,getSchemas);
router.get("/getAllSchemas/:projectId",checkAuthorization,getAllSchemas);
router.get("/getSchemaInfo/:schemaId",checkAuthorization,getSchemaInfo);

module.exports=router