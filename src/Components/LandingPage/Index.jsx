import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LandingPage.css';
import Background from '../../Assets/Background.jpg';

import Tools from './Tools';
import FlowChart from './FlowChart';
import Features from './Features';
import About from './About';
import Divider from './Divider';






const LandingPage = () => {
  return (
    <>
      <div className="landing-poster">
        <div className="background-container">
          <img src={Background} alt="Background" className="background-image" />
          <div className="overlay">
            <h1 style={{ color: "black", fontWeight: "bold" }}>Welcome to BackendBuddy</h1>
          </div>
        </div>
      </div>
      {/* <Divider /> */}
      <About />
      {/* <Divider /> */}
      <Features />
      {/* <Divider /> */}
      <FlowChart />
      {/* <Divider /> */}
      <Tools />
      <ToastContainer
        position="top-center"
        autoClose={3000}
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

export default LandingPage;
