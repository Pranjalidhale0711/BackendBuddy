import React from "react"
import Error from '../../Utils/Error'
import loginImg from "../../Assets/loginImage.json" 
import Validate from '../../Validators/Validate'
import Lottie from "lottie-react";
import { handleLogin } from "../../api/auth"
import HelloImage from "../../Assets/hello.json"
import LoginNavbar from "../Navbar/LoginNavbar";

function Login() {
    /*************************  State Declarations  *************************/
    const [data, setData] = React.useState({
        email: "",
        password: ""
    })
    const [error, setError] = React.useState({
        show: false,
        title: "",
        body: ""
    })

    /*************************  Functions  *************************/
    const handleClick = async () => {
        if (data?.email === "" || data?.password === "") {
            setError(prev => ({ ...prev, show: true, title: "Error", body: "Fields cannot be empty" }))
            return;
        }
        else if (!Validate("email", data?.email)) {
            setError(prev => ({ ...prev, show: true, title: "Error", body: "Email is not valid" }))
            return;
        }
        //sending request
        const { token, error } = await handleLogin(data);
        console.log("token and error is", token, error);
        if (!error) {
            localStorage.setItem("token", token)
            window.location.replace("/dashboard")
            return;
        }
        else {
            setError(prev => ({ ...prev, show: true, title: "Error", body: error }))
            return;
        }
    }

    const handleClose = () => {
        setError(prev => ({ ...prev, show: false, title: "", body: "" }));
    }

    return (
        <>
        <LoginNavbar/>
            <div
                className=" container-fluid gradient-form d-flex justify-content-center align-items-center"
                style={{ overflow: "hidden", position: "relative", width: "100%", padding: '0px !important' }}
                id="login1"
            >
                <div
                    className="col-md-6 gradient-custom-2 d-flex justify-content-center align-items-center"
                    style={{ height: "100%" }}
                >
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4 registerImage">
                        <Lottie animationData={loginImg} />
                    </div>
                </div>
                <div className="mb-5 col-md-6 d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column ">
                        <div className="text-center registerImage">
                            <img src="not found!" alt="" />
                            <Lottie animationData={HelloImage} style={{height:"30vh"}} />
                            <p className="text-glad">Glad to have you back</p>
                        </div>
                        <input
                            type="email"
                            className="mt-4 p-2 mb-2"
                            style={{ height: "5vh", borderRadius: "6px" }}
                            onChange={(e) => { setData(prev => ({ ...prev, email: e?.target?.value })) }}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="Password"
                            className="my-2 p-2"
                            style={{ height: "5vh", borderRadius: "6px" }}
                            onChange={(e) => { setData(prev => ({ ...prev, password: e?.target?.value })) }}
                            placeholder="Password"
                            required
                        />
                        <div className="text-center pt-1 mb-3 pb-1">
                            <button
                                type="button"
                                className="btn w-100 gradient-custom-2 mb-1"
                                style={{ height: "5vh", border:"1px solid black" }}
                                onClick={handleClick}
                            >
                                Login
                            </button>
                        </div>

                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <p className="mx-1">Don't have an account?</p>
                            <p className="signup-link" style={{ textDecoration: 'none', color: '#797CCE' }} onClick={() => window.location.href = "/register"}><button className="btn w-100 gradient-custom-2" >Sign Up</button></p>
                        </div>
                    </div>
                </div>
                {/* <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                /> */}
            </div>

        </>
    )
}

export default Login