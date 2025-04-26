import React from "react";
import Feed from "./Feed";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";



const Home = () => {

    const { user, loading } = useAuth();


    return (
        <div className="home" >

            

            <Feed />

        </div>
    )
}

export default Home;