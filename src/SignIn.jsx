import React, { useState } from "react";
import supabase from "./client";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
                return;
            }
            navigate("/", { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                {error && <p className="error" >{error}</p>}
                <label htmlFor="email" >Email</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <label htmlFor="password" >Password</label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    )
}

export default SignIn;