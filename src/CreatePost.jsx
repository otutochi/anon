import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./client";
import { useAuth } from "./AuthContext";



const CreatePost = () => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const [forums, setForums] = useState([]);

    const [selectedForum, setSelectedForum] = useState("");
    const [flag, setFlag] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [file, setFile] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const flags = ["Rant", "Opinion", "Question"];



    useEffect(() => {
        const fetchForums = async () => {

            try {

                const { data, error } = await supabase
                .from("forums")
                .select("id, name")
                .order("name", {ascending: true});

                if(error) {
                    throw error
                } else {
                    setForums(data);
                    if(data.length > 0) setSelectedForum(data[0].id);
                }

            } catch (error) {
                // setError(error.message)
                console.error(error);
            }
            
        }

        
        fetchForums();
        

    }, [])


   
    

    const handleSubmit = async (event) => {

        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            let imgLink = null;

            if (file) {
                const fileExt = file.name.split(".").pop();
                const fileName = `${user.id}/${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from("post-images")
                    .upload(fileName, file);

                if (uploadError) {
                    console.error("upload error" + uploadError);
                    throw uploadError;
                } else {

                    const {data: { publicUrl }, error: urlError } = supabase
                    .storage
                    .from("post-images")
                    .getPublicUrl(fileName);

                    if(urlError) {
                        console.error("getUrl error" + urlError)
                        throw urlError;
                    } else {

                        imgLink = publicUrl;
                        console.log(publicUrl);

                    }
                }
            }

            const { data, error: insertError } = await supabase
                .from("posts")
                .insert({
                    forum_id: selectedForum,
                    author_id: user.id,
                    title,
                    body,
                    flag,           
                    img_link: imgLink
                })
                .select();

            if (insertError){
                console.error("insert error" + insertError)
                throw insertError;
            }

            console.log(data);

            // const newPost = data[0];
            navigate("/", { replace: true });


        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

    }


    return (
        <div className="create-post-form" >

            <h2>Create New Post</h2>

            <form onSubmit={handleSubmit}> 

                {error && <p className="error">{error}</p>}

                <label htmlFor="forum">Forum</label>
                <select id="forum" value={selectedForum} onChange={(e) => setSelectedForum(e.target.value)} required>
                    {forums.map((f) => <option key={f.id} value={f.id}>{f.name}</option> )}
                </select>

                <label htmlFor="flag">Flag</label>
                <select id="flag" value={flag} onChange={(e)=>setFlag(e.target.value)} required >
                    {flags.map((f, i)=> <option key={i} value={f}>{f}</option> )}
                </select>

                <label htmlFor="title">Title</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <textarea
                    placeholder="Write your comment…"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />

                <label htmlFor="file">Image (optional)</label>
                <input id="file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

                <button type="submit" disabled={loading}>{ loading ? "Posting..." : "Post"  }</button>

                

            </form>

        </div>
    )
}

export default CreatePost;