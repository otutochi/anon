import React, { useState, useEffect } from "react";
import supabase from "./client";


const Comment = ({ comment_id }) => {

    const [comment, setComment] = useState(null);
    const [author, setAuthor] = useState(null);
    const [error, setError] = useState(null);

    

    useEffect(() => {
        const getCommentAndAuthor = async () => {
            const { data: commentData, error: commentError } = await supabase
                .from("comments")
                .select("*")
                .eq("id", comment_id)
                .single();
            if (commentError) {
                setError(commentError);
                return;
            } else {
                setComment(commentData);
            }

            const { data: authorData, error: authorError } = await supabase
                .from("profiles")
                .select("username, avatar")
                .eq("id", commentData.author_id)
                .single();

            if (authorError) {
                setError(authorError);
            } else {
                setAuthor(authorData);
            }
        };
        getCommentAndAuthor();
    }, [comment_id]);

    if (!comment || !author) return null;

    return (
        <div className="comment" >
            <span className="post-header" style={{ display: 'inline-flex', alignItems: 'center'}} >
                {< img src={author.avatar} alt={author.username} className="avatar" />}
                <span>{author.username}</span>
                <span>• {new Date(comment.created_at).toLocaleDateString()}</span>
            </span>

            <p>{comment.body}</p>
        </div>
    )

}

export default Comment;