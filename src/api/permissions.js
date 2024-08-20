import axiosInstance from "../Utils/Axios";

const addPermissions = async (projectId, permission) => {
    try {
        const res = await axiosInstance.post("http://localhost:8021/api/v1/addPermission", {
            projectId: projectId,
            permissions: permission
        });
        return {data: res?.data, error: null}
    } catch (error) {
        return {data: null, error: error?.response?.data?.message};
    }
};

const deletePermission = async (projectId, permission) => {
    try {
        const res = await axiosInstance.delete("http://localhost:8021/api/v1/deletePermission", {
            data: {
                projectId: projectId,
                permissionName:permission
            }
        });
        return {data: res?.data, error: null}
    } catch (error) {
        return {data: null, error: error?.response?.data?.message};
    }
};


const getAllPermission = async(id) =>{
    try {
      const permissions = await axiosInstance.get(`http://localhost:8021/api/v1/getAllPermissions/${id}`);
      return {permissions: permissions?.data?.permissions, error:null};
    } catch (error) {
      console.log(error);
      return {projects: "", error: error?.message}
    }
  }

export {addPermissions, deletePermission,getAllPermission};