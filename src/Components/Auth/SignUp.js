import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
// import { handleSubmitSignUp } from '../../Api/auth';
import Lottie from "lottie-react";
import Signin from "../../Assets/Signin.json"
import { handleSubmitSignUp } from '../../requests/auth_requests';




function SignIn() {
  const [username,setUsername]=useState({});
  const [email,setEmail]=useState({});
  const [password,setPassword]=useState({});
  const [confirmPassword,setConfirmPassword]=useState({});
  const navigate = useNavigate();

  const handleSubmit=async()=>{
   const response = await handleSubmitSignUp(username,email,password,confirmPassword);
   console.log("res us", response);
   if(response.error==null)
    {
      // toast.success(response.data.message);
      // console.log("res is",response.data.message);
      navigate("/sign-in");
      
    }
    else
    {
      toast.error(response.error);
    }
    
  }  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-[#FFFBF5] to-[#F7EFE5]">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <Lottie animationData={Signin} className="max-w-lg max-h-lg" />
      </div>
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-gradient-to-r from-[#FFFBF5] to-[#F7EFE5] p-6">
        <div className="w-full max-w-md bg-[#FFFBF5] rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#1E1F3E]">Sign Up</h2>
          <input
            placeholder="Username"
            className="w-full mb-4 p-3 border border-[#C3ACD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
          />
          <input
            placeholder="Enter your Email"
            className="w-full mb-4 p-3 border border-[#C3ACD0] rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
          />
          <input
            placeholder="Password"
            className="w-full mb-4 p-3 border border-[#C3ACD0] rounded-lg"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <input
            placeholder="Confirm Password"
            className="w-full mb-4 p-3 border border-[#C3ACD0] rounded-lg"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
          <button
            className="w-full p-3 bg-[#1E1F3E] text-white rounded-lg hover:bg-[#C3ACD0] hover:text-black"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <div className="flex items-center justify-between mt-6 text-[#1E1F3E]">
            <div>Already have an account?</div>
            <Link to="/sign-in">
              <span className="text-[#1E1F3E] hover:underline">Sign In</span>
            </Link>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}
export default SignIn