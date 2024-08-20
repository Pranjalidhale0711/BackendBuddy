const express=require("express")
const Schema=require("../models/schema_models.js")
const dotenv=require("dotenv")
const axios=require("axios");
dotenv.config();

const createSchema=async(req,res)=>{
    const { projectId } = req.params;
    const { name, fields } = req.body;
    const token = req.headers['authorization'];
    if (!projectId || projectId == null || projectId == undefined) {
        return res.status(401).json({ message: "need Project ID" })
    }
    if (!name || name == null || name == undefined) {
        return res.status(401).json({ message: "need name" })
    }
    try{
        const keys = [];
        fields.map((field, index) => {
            keys.push({ keyName: `${field.fieldName}` });
        })
        console.log(keys);
        const newSchema=await Schema.create({name:name,fields:fields,projectId:projectId,keys:keys});
        try{
           
            console.log(process.env.PROJ_SERVICE_URL);
          await axios.post(`${process.env.PROJ_SERVICE_URL}/addSchema`,{
                name:name,
                schemaId:newSchema._id,
                projectId:projectId
            },
            {
                headers:{
                    authorization:token
                }
            }
        )
        }catch(e)
        {
            return res.status(500).json({message:"Internal error"});
        }
        console.log("here");
      return  res.status(200).json({message:"schema created successfully",id:newSchema._id});

    }catch(e)
    {
       return res.status(500).json({message:"Internal error"});
    }

}


const deleteSchema=async(req,res)=>{

const {projectId,schemaId}=req.params;
const token = req.headers['authorization'];
if (!projectId || projectId == null || projectId == undefined) {
    return res.status(401).json({ message: "need Project ID" })
}
if (!schemaId || schemaId == null || schemaId == undefined) {
    return res.status(401).json({ message: "Need Schema ID" });
} 
const schema = await Schema.findById(schemaId);
const name=schema.name;
try{
    const getSchema=await Schema.findById(schemaId);
    if(getSchema==null||getSchema==undefined)
    {
        res.status(500).json({message:"something went wrong"});
    }
    await Schema.deleteOne({ _id: schemaId });
    try{
           
        console.log(process.env.PROJ_SERVICE_URL);
      await axios.post(`${process.env.PROJ_SERVICE_URL}/deleteSchema`,{
            name:name,
            schemaId:schemaId,
            projectId:projectId
        },
        {
            headers:{
                authorization:token
            }
        }
    )
    }catch(e)
    {
        return res.status(500).json({message:"Internal error"});
    }
    return res.status(200).json({ message: "Schema Deleted Sccessfully" });
}catch(e)
{
    res.status(500).json({message:"something went wrong"});
}
}


const updateSchema=async(req,res)=>{
    const {fields}=req.body;
    const {schemaId}=req.params;
    if (!schemaId || schemaId == null || schemaId == undefined) {
        return res.status(401).json({ message: "Need Schema ID" });
    }
    try{
        const getSchema=await Schema.findById(schemaId);
        if(getSchema==null||getSchema==undefined)
        {
            return res.status(401).json({ message: "schema doesnot exisits" });
        }
        if (!(fields === null) && !(fields === undefined) && (fields)) {
            getSchema.fields = fields;
        }
        await getSchema.save();
      return  res.status(200).json({ message: "Schema Updated SuccessFully" });
    }catch(e)
    {
        return res.status(500).json({ message: "Something Went Wrong" });
    }

  


}

const getSchemaInfo=async(req,res)=>{
    try {
        const {schemaId} =  req.params;
        const schema = await Schema.findById(schemaId);
        if(schema){
            return res.status(200).json({message: "OK", schema: schema});
        }else {
            return res.status(500).json({message: "something went wrong!"});
        }
    } catch (error) {
        console.log("can't fetch schema info", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
const getSchemas=async(req,res)=> {
    const {schemaIds}=req.body;
    console.log(schemaIds);
    const allSchemaDetails=[];
    try{
      await Promise.all(
        schemaIds?.map(async (schema) => {
            const schemaInfo = await Schema.findById(schema);
            if (schemaInfo != undefined && schemaInfo != null && schemaInfo) {
                allSchemaDetails.push(schemaInfo);
            }
        })
    )
      console.log(allSchemaDetails)
      console.log("jjj",allSchemaDetails);
      return res.status(200).json({message:"Schemas Fetched Successfully",schemaDetails:allSchemaDetails})
    }catch(e)
    {
      return res.status(500).json({message:"Internal Error"})
    }
}

const getAllSchemas = async (req, res) => {
    try {
        const { projectId } = req.params;
        const schemas = await Schema.find({ projectId: projectId });
        if(schemas) {
            return res.status(200).json({message: "OK", schemas: schemas});
        } else {
            return res.status(500).json({message: "something went wrong!"});
        }
    } catch (error) {
        console.log("can't fetch all schemas", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}



module.exports={
createSchema,
deleteSchema,
updateSchema,
getSchemas,
getAllSchemas,
getSchemaInfo
}