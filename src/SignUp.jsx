import React, { useState } from "react";
import supabase from "./client";
import { Link } from "react-router-dom";



const SignUp = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState(null);
    const [signedUp, setSignedUp] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { data: { user }, error: signUpError } = await supabase.auth.signUp({ 
                email, 
                password,
            });
            if (signUpError) {
              throw signUpError;
            }

            const { data, error: profileError } = await supabase
                .from("profiles")
                .insert({
                    id: user.id,
                    username,
                    bio,
                    avatar
                })
            if(profileError) {
                throw profileError;
            }

            setSignedUp(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }


    };
    
    


    if (signedUp) {
        return (
            <div>
                <p>We've sent a confirmation link to your email.</p>
                <Link to="/">Home</Link>
            </div>
        );
    }

    return (
        <div>

            <form onSubmit={handleSubmit} >

                    {error && <p className="error" >{error}</p>}

                    <label htmlFor="email" >Email</label>
                    <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

                    <label htmlFor="password" >Password</label>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />

                    <label htmlFor="username" >Username</label>
                    <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} required />

                    <label htmlFor="bio" >Bio</label>
                    <input id="bio" type="text" value={bio} onChange={e => setBio(e.target.value)} required />

                    <label htmlFor="avatar" >Avatar</label>
                    <select id="avatar" value = {avatar} onChange={e => setAvatar(e.target.value)} required >
                        <option value="/public/avatars/gorilla.jpg">Gorilla</option>
                        <option value="/public/avatars/turtle.jpg">Turtle</option>
                        <option value="/public/avatars/flamingo.jpg">Flamingo</option>
                        <option value="/public/avatars/chameleon.jpg">Chameleon</option>
                    </select>




                    <button type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                    
                </form>

        </div>
    )
}

export default SignUp;