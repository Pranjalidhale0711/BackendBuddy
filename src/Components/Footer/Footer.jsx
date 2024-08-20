import React from "react";
import "./Footer.css";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <div style={{maxWidth:"100vw"}}>
            <footer style={{maxWidth:"100vw"}} className="footer">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <h2 className="footer-heading"><a href="#" className="logo">Backend Buddy</a></h2>
                            <p className="menu">
                                <a href="#">Home</a>
                                <a href="#">About</a>
                                <a href="#">Project</a>
                                <a href="#">Contact Us</a>
                            </p>
                            <ul className="footer-social p-0">
                                <li className="social-animate"><a href="#" data-placement="top" title="Twitter"><span className="ion-logo-twitter" /><RiTwitterXLine /></a></li>
                                <li className="social-animate"><a href="#" data-placement="top" title="Facebook"><span className="ion-logo-facebook" /><FaFacebookSquare /></a></li>
                                <li className="social-animate"><a href="#" data-placement="top" title="Instagram"><span className="ion-logo-instagram" /><FaInstagram /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12 text-center">
                            <p className="copyright">
                                Copyright © All rights reserved <i className="ion-ios-heart" aria-hidden="true" /> <a href="#" target="_blank">Backend Buddy</a></p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
