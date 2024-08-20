import React from 'react'
import FlowChartImage from "../../Assets/Flowchart.png"
import FlowchartMobile from "../../Assets/Flowchart-mobile.png"
import "./LandingPage.css"
function FlowChart() {
  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", flexDirection: "column",  marginTop:"50px" }}>
    <h3 style={{ fontWeight: "bold" }}>Project Architecture</h3>
    <img className='flowchart-desktop' src={FlowChartImage} alt='FlowChart' style={{ height: "43vh" }} />
    <img className='flowchart-mobile' src={FlowchartMobile} alt='FlowChart' style={{ height: "43vh", display: "none" }} />
  </div>
  )
}

export default FlowChart