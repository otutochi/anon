import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import supabase from "./client";

const CreateComment = ({ post_id, onPosted }) => {
    const { user } = useAuth();
    const [body, setBody] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { data, error: insertError } = await supabase
                .from("comments")
                .insert({
                post_id,
                author_id: user.id,
                body,
                })
                .select();
            if (insertError) {
                throw insertError
            } else {
                setBody("");
            }
            
            if (onPosted) {
                onPosted(data[0]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-comment-form">
            <textarea
                placeholder="Write your comment…"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "Posting..." : "Post Comment"}
            </button>
        </form>
    );
};

export default CreateComment;