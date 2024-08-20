import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
                <div style={{minHeight:"70vh", margin:"0"}}>{children}</div>
            <Footer />
        </>
    )
}

export default Layout