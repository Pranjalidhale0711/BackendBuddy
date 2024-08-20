import axiosInstance from "../Utils/Axios";

const addNewSchema = async (schemaName, projectId, fields) => {
    try {
        const res = await axiosInstance.post(`http://localhost:8023/api/v1/createSchema/${projectId}`,{
            name: schemaName,
            fields: fields
        })
        return {res: res?.data?.message, error:null};
    } catch (error) {
        console.log(error);
        return {projects: "", error: error?.message}
    }
}

const fetchSchema = async (schemaId) => {
    try {
        const res = await axiosInstance.get(`http://localhost:8023/api/v1/getSchemas/${schemaId}`)
        console.log("response of sschema info is", res);
        return {res: res?.data?.schema, error:null};

    } catch (error) {
        console.log(error);
        return {res: "", error: error?.message}
        
    }
}

const updateSchema = async (schemaId,fields) =>{
    try {
        const res = await axiosInstance.post(`http://localhost:8023/api/v1/updateSchema/${schemaId}`,{
            fields:fields
        });
        console.log("update response is", res);
        return {error:null}
    } catch (error) {
        console.log(error);
        return {error:"Something went wrong"}

        
    }
}

const deleteSchema = async(projectId,schemaId) =>{
    try {
        const res = await axiosInstance.post(`http://localhost:8023/api/v1/deleteSchema/${projectId}/${schemaId}`) 
        return {error:null}
    } catch (error) {
        console.log("error during deleting schema", error);
        return {error:"Something went wrong"}  
    }
}

export {addNewSchema,fetchSchema,updateSchema, deleteSchema};
