import api from "../api/axios.js";
import {useEffect, useState} from "react";

export default function Post({userId, text, postId, currentUserId, onRefresh}) {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/auth/" + userId);
                setUsername(res.data.name);
            } catch (e) {
                console.log(e);
            }
        };
        fetchUser();
    }, [userId]);

    const handleDelete = async () => {
        await api.delete("/post/delete/" + postId);
        onRefresh();
    };

    return <div className="card card-border bg-base-100">
        <div className="card-body">
            <h2 className="card-title">{username}</h2>
            <p>{text}</p>
            <div className="card-actions justify-end">
                {(currentUserId === userId) && <button className="btn btn-sm btn-error" onClick={handleDelete}>Delete</button>}
                <button className="btn btn-sm btn-outline">Comment</button>
            </div>
        </div>
    </div>
}