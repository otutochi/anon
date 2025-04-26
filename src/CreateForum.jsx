import React from "react";
import { useState } from "react";
import supabase from "./client";
import { useNavigate } from "react-router-dom";





const CreateForum = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate()


    const handleSubmit = async (event) => {

        event.preventDefault();


        try {
            const { data, error } = await supabase
                .from("forums")
                .insert({
                    name,
                    description,
                    created_by: (await supabase.auth.getUser()).data.user.id
                })
                .select()

                navigate("/", { replace: true });

            if(error) {
                throw error;
                
            }
        } catch(error) {
            setError(error.message);
        }

    }


    return (
        <div>

            <form onSubmit={handleSubmit}  >  

                {error && <p className="error" >{error}</p>}

                <label htmlFor="name">Forum Name</label>
                <input id="name" value={name} onChange = {(e) => setName(e.target.value) } required/>

                <label htmlFor="description">Description</label>
                <input id="description" value={description} onChange = {(e) => setDescription(e.target.value)} required/>

                <button type="submit">Create Forum</button>

            </form>

        </div>
    )
}

export default CreateForum;