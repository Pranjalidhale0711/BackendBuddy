import axios from "axios";

const token = window.localStorage.getItem("token");

const API_URI = process.env?.REACT_APP_API_URI


const axiosInstance = axios.create({
  baseURL: API_URI,
  headers: {
    Authorization: token ? `${token}` : "",
  },
});

axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem("user");
    console.log("uri is", API_URI);
    if(token){
        req.headers.Authorization = `${token}`
    }
    return req;
})

export default axiosInstance;