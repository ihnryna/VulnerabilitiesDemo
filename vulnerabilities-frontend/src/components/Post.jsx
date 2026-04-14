import api from "../api/axios.js";
import {useEffect, useState} from "react";

export default function Post({userId, text}) {
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

    return <div className="card card-border bg-base-100">
        <div className="card-body">
            <h2 className="card-title">{username}</h2>
            <p>{text}</p>
            <div className="card-actions justify-end">
                <button className="btn btn-sm btn-outline">Comment</button>
            </div>
        </div>
    </div>
}