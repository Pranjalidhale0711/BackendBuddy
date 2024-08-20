import React from 'react'
import ReactImage from "../../Assets/react.png"
import JwtImage from "../../Assets/jwt.png"
import MongoDBImage from "../../Assets/mongodb.png"
import ExpressImage from "../../Assets/express.png"
import NodejsImage from "../../Assets/nodejs.png"
function Tools() {
  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", flexDirection: "column",  marginTop:"50px", backgroundColor:"#fbf9f9", padding:"20px" }}>
    <h3>Tools used</h3>
    <div className='row' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw" }}>
      <div className='col-md-2' style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <img src={ReactImage} alt='Reactjs' />
      </div>
      <div className='col-md-2' style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>

        <img src={NodejsImage} alt='Nodejs' />
      </div>
      <div className='col-md-2' style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>

        <img src={JwtImage} alt='JWT' />
      </div>
      <div className='col-md-2' style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>

        <img src={MongoDBImage} alt='Javascript' />
      </div>
      <div className='col-md-2' style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <img src={ExpressImage} alt='Express' />
      </div>
    </div>
  </div>
  )
}

export default Tools