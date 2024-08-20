import axiosInstance from "../Utils/Axios";

const fetchProjects = async() => {
    try {
      const projects = await axiosInstance.get("http://localhost:8021/api/v1/getAll");
      console.log("response from fetch project is", projects);
      return {projects: projects?.data?.projects, error:null};
    } catch (error) {
      console.log(error);
      return {projects: "", error: error?.response?.data?.message}
    }
  
  }
  const fetchProjectInfo = async(id) =>{
    try {
      const project = await axiosInstance.get(`http://localhost:8021/api/v1/getAllInfo/${id}`);
      console.log("project is ",project);
      return {project: project?.data?.project, error:null, roles: project?.data?.roles, schemas:project?.data?.schemas};
    } catch (error) {
      console.log(error);
      return {projects: "", error: error?.message}
    }
  }

  const addNewProject = async(name) =>{
    try {
      const res = await axiosInstance.post("http://localhost:8021/api/v1/createProject",{name:name});
      console.log("res is", res);
      return {res: res?.data?.message, error:null};
    } catch (error) {
      console.log(error);
      return {projects: "", error: error?.message}
    }
  }

  const createGithubRepository = async(projectId) =>{
    try {
        const res = await axiosInstance.get(`http://localhost:8021/api/v1/download/${projectId}`);
        return {error:null}
    } catch (error) {
        return {error:"Something Went wrong"}
    }
  }

 
  export {fetchProjects, fetchProjectInfo, addNewProject, createGithubRepository };
