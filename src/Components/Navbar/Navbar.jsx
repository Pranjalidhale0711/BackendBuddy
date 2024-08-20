import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoListSharp } from "react-icons/io5";
import { TfiPencilAlt } from "react-icons/tfi";
import { MdOutlineDashboard } from "react-icons/md";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isWideScreen = windowWidth > 1000;
  const navigate = useNavigate();


  const handleClickOutside = (event) => {
    //checks if click is not on sidebar
    if (sidebar && !isWideScreen && !document.querySelector('.sidebar-menu').contains(event.target) && !document.querySelector('.sidebar-icons').contains(event.target)) {
      setSidebar(false);
    }
  };

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/login")
  }

  useEffect(() => {
    if (!isWideScreen) {
      if (sidebar && !isWideScreen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else if (!isWideScreen) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
    // eslint-disable-next-line
  }, [sidebar]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      {isWideScreen ? (
        <>
          <nav className="navbar-wideScreen">
            <div className="logo" onClick={()=>navigate(`/dashboard`)} style={{ marginLeft: "30px" }}> BackendBuddy</div>
            <ul className="nav-links" style={{ marginRight: "50px" }}>
              <li><Link to="/project">Projects</Link></li>
              <li onClick={handleLogout}><Link >Logout</Link></li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <div style={{ maxWidth: "100vw" }}>
            <div className='navbar'>
              <Link to='#' className='sidebar-icons'>
                <FaBars onClick={showSidebar} />
              </Link>
            </div>
            <nav className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'}>
              <ul className='sidebar-menu-items' onClick={showSidebar}>
                <li className='sidebar-toggle'>
                  <Link to='#' className='sidebar-icons'>
                    <IoMdClose style={{ color: "black" }} />
                  </Link>
                </li>
                <li className="list-items">
                  <Link to='/project'>
                    <IoListSharp style={{ color: "black" }} />
                    <span style={{ color: "black" }}>Projects</span>
                  </Link>
                </li>
                <li className="list-items" onClick={handleLogout}>
                  <Link to='#'>
                    <CiLogout style={{ color: "black" }} />
                    <span style={{ color: "black" }}>Log Out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

        </>
      )}
    </>
  );
}

export default Navbar;


