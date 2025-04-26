import React, { useState, useEffect } from "react";
import Forum from "./Forum";
import supabase from "./client";
import { Link } from 'react-router-dom';



const SideBar = () => {

    const [forums, setForums] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        const getForums = async () => {

            try {
                const {data, error} = await supabase
                    .from("forums")
                    .select("*")

                if(error) {
                    throw error;
                } else {
                    setForums(data);
                }

            } catch (error) {
                console.error(error);
                setError(error.message);
            }

        }
        getForums();

    },[])


    return (
        <div className="sidebar" >

            <Link to="/">Home</Link>

            <h3>Forums</h3>

            {error && <p>{error}</p>}

            {forums.map((f) => (
              <Link key={f.id} to={`/forums/${f.id}`}>
                {f.name}
              </Link>
            ))}

            <Link to="/createforum">Add Forum</Link>

        </div>
    )
}

export default SideBar;