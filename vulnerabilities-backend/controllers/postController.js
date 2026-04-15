import Post from "../models/post.js";

export const create = async (req, res) => {
    try {
        const newPost = new Post({
            text: req.body.text,
            author: req.user.userId
        });
        await newPost.save();
        res.status(200).json({message: "Post created successfully."});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        if (!posts) {
            return res.status(404).json({message: "Posts not found"});
        }
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const update = async (req, res) => {
    try {
        if(req.body.text !== undefined && req.body.text.trim().length === 0) {
            return res.status(400).json({message: "Post text is required"});
        }
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json("Post deleted successfully");
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

