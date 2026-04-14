import api from "../api/axios.js";
import {useState} from "react";

export default function PostForm({user, onRefresh}) {
    const [input, setInput] = useState("");

    const handlePost = async () => {
        if (input === "") {
            return;
        }
        const postData = {
            _id: null,
            author: user.userId,
            text: input,
        };
        await api.post("/post/", postData);
        setInput("");
        onRefresh();
    };

    return <div className="card bg-base-100 shadow-md">
        <div className="card-body">
            <textarea className="textarea textarea-bordered w-full"
                      placeholder="what do you want to share?"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex justify-center mt-2">
                <button className="btn btn-primary w-full" onClick={handlePost}>Post</button>
            </div>
        </div>
    </div>
}
