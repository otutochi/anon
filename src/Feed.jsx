import React, { useState, useEffect } from "react";
import Post from "./Post";
import supabase from "./client";



const Feed = () => {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{

        const getPosts = async () => {

            try {
                const { data, error } = await supabase
                    .from("posts")
                    .select("id")

                if(error) {
                    throw error
                } else {
                    setPosts(data)
                }
            } catch (error) {
                console.error(error)
                setError(error.message)
            }

        }

        getPosts();

    },[])




    return (
        <div className="feed" >

            {error && <p>{error}</p>}

            {posts && posts.map((p) => (
                <Post key={p.id} id={p.id} />
            ))}

        </div>
    )
}

export default Feed;