import React from 'react'

function Features() {
  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", flexDirection: "column",  marginTop:"50px", backgroundColor:"#fbf9f9", paddingBottom:"3%" }}>
        <h3 style={{ fontWeight: "bold", marginTop:"20px" }}>FEATURES</h3>
        <div className='row' style={{ justifyContent: "space-around", display: "flex", alignItems: "center", width: "100vw", marginTop: "20px" }}>
          <div className='col-md-2' style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "30vh", marginTop: "10px" }}>
            <div class="card" style={{ width: "18rem", height:"30vh" }}>
              <div class="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h5 class="card-title">Schema Managment</h5>
                <p class="card-text">Effortlessly define and manage your database schemas. Our tool ensures that your data structures are organized and optimized for your MERN project.
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-2' style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "30vh", marginTop: "10px" }}>
            <div class="card" style={{ width: "18rem", height:"30vh" }}>
              <div class="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h5 class="card-title">Routes Managment</h5>
                <p class="card-text">Simplify the setup of your application's routes. Customize and control the flow of your web application with ease, ensuring a seamless user experience.
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-2' style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "30vh", marginTop: "10px" }}>
            <div class="card" style={{ width: "18rem", height:"30vh" }}>
              <div class="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h5 class="card-title">Role Managment</h5>
                <p class="card-text">Create and manage roles with precision. Define access levels and responsibilities, ensuring that the right people have the right permissions.
                </p>
              </div>
            </div>
          </div>
          <div className='col-md-2' style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "30vh", marginTop: "10px" }}>
            <div class="card" style={{ width: "18rem", height:"30vh" }}>
              <div class="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h5 class="card-title">Permission Managment</h5>
                <p class="card-text">Granularly control who can do what. Assign and manage permissions to maintain security and functionality, tailored to your project's needs.</p>
              </div>
            </div>
          </div>


          {/* <div className='col-md-3' style={{backgroundColor:"violet", height:"30vh"}}></div> */}


        </div>
      </div>
  )
}

export default Features