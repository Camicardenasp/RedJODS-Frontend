import React from 'react'
import AppBar from './AppBar'
import {Outlet} from 'react-router-dom'
import Footer from '/Footer.png'

const Root = () => {
    return (
        <>
            <AppBar/>
            <div>
                <Outlet />
            </div>
            <footer>
                <img src={Footer} alt="" style={{ maxWidth: "100vw" }} />
            </footer>
        </>
    )
}

export default Root;