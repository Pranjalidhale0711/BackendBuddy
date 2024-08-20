import axiosInstance from "../Utils/Axios";

const addNewRole = async (name, projectId, permissions) => {
    
    try {
        console.log("project id is", projectId);
        console.log("project id is", name);
        const res = await axiosInstance.post(`http://localhost:8022/api/v1/addRole/${projectId}`,{
            name: name,
            projectId: projectId,
            permissions: permissions
        });
        console.log("role is ",res);
        return { role: res?.data?.message, error: null};
    } catch (error) {
        console.log("Error adding new role:", error);
        return {role: null, error: error?.response?.data?.message};
    }
}

const deleteRole = async (role,projectId) => {
    try {
        const res = await axiosInstance.delete("http://localhost:8022/api/v1/deleteRole", {
            data: {
                roleId: role,
                projectId:projectId
            }
        });
        return {error: null};
    } catch (error) {
        console.error("Error deleting role:", error);
        return {error: error?.response?.data?.message};
    }
}

const updateRole = async (role, name, permissions) => {
    try {
        console.log("response is",role);
        const res = await axiosInstance.post("http://localhost:8022/api/v1/updateRole", {
            roleId:role,
            name: name,
            permissions: permissions
        });
        return {res: res, error: null};
    } catch (error) {
        console.log("error updating role:", error);
        return {error: error?.res?.data?.message};
    }
}

export {addNewRole, deleteRole, updateRole};

