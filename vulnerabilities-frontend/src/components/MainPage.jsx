import {useEffect, useState} from "react";
import api from "../api/axios.js";
import Post from "./Post.jsx";
import PostForm from "./PostForm.jsx";

export default function MainPage({user}) {
    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await api.get("http://localhost:3000/api/post/all");
                setPosts(prev => {
                    if (JSON.stringify(prev) === JSON.stringify(posts.data)) {
                        return prev;
                    }
                    return posts.data;
                });
                console.log(posts);

            } catch (err) {
                console.log(err);
            }
        };
        fetchPosts();

        const interval = setInterval(fetchPosts, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [refresh]);

    const handleRefresh = () => {
        setRefresh(prev => !prev);
    }

    return <div className="min-h-screen flex flex-col items-center bg-base-200 p-6">
        <div className="w-full max-w-xl space-y-4">
            <PostForm user={user} onRefresh={handleRefresh}/>
            {posts.map(post => (
                <Post key={post.id} text={post.text} userId={post.author}/>
            ))}
        </div>
    </div>
}