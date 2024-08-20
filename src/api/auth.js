import axiosInstance from "../Utils/Axios";

const handleLogin = async (data) => {
  console.log(data);
    try {
      const { email, password } = data;
      const response = await axiosInstance.post("http://localhost:8020/api/v1/login", {
        email: email,
        password: password,
      })
      return { token: response?.data?.data, error: null };
    } catch (error) {
      console.log("error is", error);
      return {error: error?.response?.data?.message}
    }
  };

 const handleRegister = async(data) =>{
  try {
    const { email, password, userName,confirmPassword } = data;
    const response = await axiosInstance.post("http://localhost:8020/api/v1/register", {
      email: email,
      password: password,
      userName:userName,
      confirmPassword:confirmPassword
    })
    console.log("res is", response);
    return {error: null };
  } catch (error) {
    console.log("error is", error);
    return {error: error?.response?.data?.message}
  }
 }

  const fetchUser = async() => {
    try {
      const user_info = await axiosInstance.get("http://localhost:8020/api/v1/getUser");
      // console.log("response from fetch user is", user_info);
      return {user: user_info?.data?.message, error:null};
    } catch (error) {
      console.log(error);
      return {user: "", error: error?.response?.data?.message}
    }
  
  }

  export { handleLogin, fetchUser, handleRegister};