import React from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";



const Layout = () => {


    return (
        <div className="layout" >
            
            <NavBar />
            
            <div className="sidebar-and-content" >
                <SideBar />
                <div className="main" >

                    <Outlet />

                </div>
                
            
            </div>

        </div>
    )
}

export default Layout;