import React from "react";
import { Link } from "react-router-dom";



const NavBar = () => {


    return (
        <div className="navbar" >

            <h1>anon</h1>

            <div>
                <Link to="/createpost" >Create</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>

        </div>
    )
}

export default NavBar;