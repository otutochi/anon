import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";
import supabase from "./client";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";




const Post = ({ id }) => {

    const navigate = useNavigate();

    

    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);

    // const [comments, setComments] = useState([]);

    useEffect(() => {
        const getPostAndAuthorAndComments = async () => {
            try {

                console.log('Rendering Post for id=', id);

                const { data: postData, error: postError } = await supabase
                    .from("posts")
                    .select("*")
                    .eq("id", id)
                    .single();
                if (postError) {
                    throw postError;
                }
                setPost(postData);

                const { data: authorData, error: authorError } = await supabase
                    .from("profiles")
                    .select("username, avatar")
                    .eq("id", postData.author_id)
                    .single();
                if (authorError) {
                    throw authorError;
                }
                setAuthor(authorData);

                // const { data: commentData, error: commentError } = await supabase
                //     .from("comments")
                //     .select("*")
                //     .eq("post_id", postData.id)
                // if(commentError){
                //     throw commentError;
                // }
                // setComments(commentData);


            } catch (err) {
                console.error(err);
                setError(err.message);
            }
            
        };

        getPostAndAuthorAndComments();
    }, [id]);

    // const handleNewComment = (newComment) => {
    //     setComments(prev => [...prev, newComment]);
    // }

     


    return (
        <div className="post" onClick={() => navigate(`postview/${id}`)} style={{cursor: "pointer"}} >
            {error && <p className="error">{error}</p>}
            {post && author && (
                <div>
                    <span className="post-header" style={{ display: 'inline-flex', alignItems: 'center'}}>
                        {author.avatar && (<img src={author.avatar} alt={author.username} className="avatar"  />)}
                        <span>{author.username}</span>
                        <span>• {new Date(post.created_at).toLocaleDateString()} •</span>
                        <span>{post.flag}</span>
                    </span>
                    <h3>{post.title}</h3>
                    <div className="post-body">
                        <p>{post.body}</p>
                    </div>
                    {post.img_link &&  <img src={post.img_link} className="post-image" />}

                    <div>
                        <button>Upvote</button>
                        <button>Downvote</button>
                        <button>Repost</button>
                    </div>

                    {/* <CreateComment post_id={post.id} onPosted={handleNewComment} />

                    <div>
                        {comments.map((comment) => <Comment key={comment.id} comment_id={comment.id} /> )}
                    </div> */}


                </div>
            )}


        </div>
    )
}

export default Post;