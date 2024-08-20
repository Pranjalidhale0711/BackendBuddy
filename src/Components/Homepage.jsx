import React from 'react'
import { useNavigate } from "react-router-dom";

function Homepage() {
    const navigate = useNavigate();
    return (
        <>
            <div>Homepage</div>
            <button onClick={()=>navigate("/login")}>Login</button>
            <button onClick={() => {navigate("/register")}}>Register</button>
        </>
    )
}

export default Homepage