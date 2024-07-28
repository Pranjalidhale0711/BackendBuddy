
import axios from "axios";

export const handleSubmitSignUp = async (
    userName,
    email,
    password,
    confirmPassword
  ) => {
    try {
        console.log(userName,email)
        const res = await axios.post("http://localhost:8020/api/v1/register", {
        userName: userName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      console.log(res);
      return { error: null };
    } catch (error) {
      return { error: error };
    }
  };

  export const handleSubmitSignIn = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8021/api/auth/login", {
        email: email,
        password: password,
      });
  
      const { token } = res.data;
      localStorage.setItem("user", token);
      return { error: null };
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      console.log(errorMessage);
      return { error: errorMessage };
    }
  };