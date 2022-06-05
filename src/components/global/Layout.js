import * as React from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
    return (
        <>
            <Navbar/>
            <main className="overflow-x-hidden">
                {children}
            </main>
            <Footer/>
        </>
    )
}

export default Layout