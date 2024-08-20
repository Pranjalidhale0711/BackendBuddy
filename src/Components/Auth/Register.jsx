import React from 'react'
import Error from '../../Utils/Error'
import Validate from '../../Validators/Validate'
import { useNavigate } from 'react-router-dom'
import { handleRegister } from '../../api/auth'
import Lottie from "lottie-react";
import RegisterImg from "../../Assets/registerImage.json"
import LoginNavbar from '../Navbar/LoginNavbar'
import "./Auth.css"
function Register() {
    /*State Declarations  *******************************/
    const [data, setData] = React.useState({
        email: "",
        userName: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = React.useState({
        show: false,
        title: "",
        body: "",
    })
    const navigate = useNavigate();

    /**Functions ************************************/
    const handleClose = () => {
        setError(prev => ({ ...prev, show: false, title: "", body: "" }));
    }

    const handleClick = async () => {
        if (data?.email === "" || data?.userName === "" || data?.password === "" || data?.confirmPassword === "") {
            setError(prev => ({ ...prev, show: true, title: "Error", body: "Fields cannot be empty" }))
            return;
        }
        else if (!Validate("email", data?.email)) {
            setError(prev => ({ ...prev, show: true, title: "Error", body: "Email is not valid" }))
            return;
        }
        else if (!Validate("password", data?.password)) {
            setError(prev => ({ ...prev, show: true, title: "Error", body: "Password is not valid" }))
            return;
        }
        else if (data?.password !== data?.confirmPassword) {
            setError(prev => ({ ...prev, show: true, title: "Error", body: "Password and Confirm Password does not match" }))
            return;
        }

        const { error } = await handleRegister(data);
        if (!error) {
            navigate("/login")
            return;
        }
        else {
            setError(prev => ({ ...prev, show: true, title: "Error", body: error }))
            return;
        }
    }

    return (
        <>
        <LoginNavbar/>
            <div
                className=" container-fluid gradient-form d-flex justify-content-center align-items-center"
                style={{ overflow: "hidden", position: "relative", width: "100%", }}
            >
                <div className="col-6 mb-5 d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                    <div className="d-flex flex-column ms-5">

                        <center className="my-3 main-head"><h4>Create your account</h4></center>

                        <div className="my-1">User Name:</div>
                        <input
                            type="text"
                            className="mb-1 p-2"
                            style={{ height: "5vh", borderRadius: "6px" }}
                            onChange={(e) => { setData(prev => ({ ...prev, userName: e.target.value })) }}
                            required
                        />
                        <div className="my-1">Email:</div>
                        <input
                            type="email"
                            className="mb-1 p-2"
                            style={{ height: "5vh", borderRadius: "6px" }}
                            onChange={(e) => { setData(prev => ({ ...prev, email: e.target.value })) }}
                            required
                        />
                        <div className="my-1">Password:</div>
                        <input
                            type="Password"
                            className="mb-1 p-2"
                            style={{ height: "5vh", borderRadius: "6px" }}
                            onChange={(e) => { setData(prev => ({ ...prev, password: e.target.value })) }}
                            required
                        />
                        <div className="my-1">Confirm Password:</div>
                        <input
                            type="Password"
                            className="mb-1 p-2"
                            style={{ height: "5vh", borderRadius: "6px" }}
                            onChange={(e) => { setData(prev => ({ ...prev, confirmPassword: e.target.value })) }}
                            required
                        />
                        <div className="text-center pt-1 my-2 pb-1">
                            <button
                                type="button"
                                className="btn w-100 gradient-custom-2"
                                style={{
                                    height: "5vh",
                                    border:"1px solid black"
                                }}
                                onClick={handleClick}
                            >
                                Create Account
                            </button>
                        </div>

                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 my-3">
                            <p className="">Already have an account?</p>
                            <p className="mx-2 login-link" style={{ textDecoration: 'none', color: '#797CCE' }} onClick={() => window.location.href = "/login"}><button className='btn'>Login</button></p>
                        </div>
                    </div>
                </div>

                <div
                    className="col-6 gradient-custom-21 d-flex justify-content-center align-items-center "
                    style={{ height: "100%", marginBottom: "20vh" }}
                >
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4 registerImage">
                        <Lottie animationData={RegisterImg} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register