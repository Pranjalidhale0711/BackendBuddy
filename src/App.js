import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({ user: " " });
  const navigate = useNavigate();
  const verifyToken = async () => {
    // if (localStorage.getItem("user")) {
    //   const res = await getUser();
    //   if(res.error!=null){
    //     toast.error(res.error);
    //     setTimeout(() => {
    //       navigate("/sign-in");
    //     }, 3000);
    //     return;
    //   }
    //   if (res != null) {
    //     setUserData({user: res.user});
    //   }
    // } 
    // else {
    //   navigate("/sign-in");
    // }
  };
  useEffect(() => {
    if (location.pathname !== "/sign-in" && location.pathname !== "/sign-up") {
      verifyToken();
    }
  }, [location.pathname]);
  return (
    <>
      <Routes>

        <Route exact path="/sign-in" element={<SignIn />}></Route>
        <Route exact path="/sign-up" element={<SignUp />}></Route>
     
      

      </Routes>
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
    </>
  );
};
export default App;