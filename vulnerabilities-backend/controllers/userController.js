import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Post from "../models/post.js";

export const register = async (req, res) => {
    try {
        if (!validateRequiredFields(["name","email", "password"], req.body, res)) return;

        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User email already exists" });
        }

        const existingUserByName = await User.findOne({ name });
        if (existingUserByName) {
            return res.status(400).json({ message: "User name already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(200).json({message: "Registered successfully."});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const login = async (req, res) => {

    if (!validateRequiredFields(["email", "password"], req.body, res)) return;

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({message: "Wrong email or password"});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({message: "Wrong email or password"});

    const token = jwt.sign(
        { userId: user._id, username: user.name, role: user.role },
        "SECRET_KEY",
        { expiresIn: "1d" }
    );

    res.json({ token });
};


const validateRequiredFields = (fields, body, res) => {
    for (const field of fields) {
        if (!body[field] || !body[field].trim()) {
            res.status(400).json({ message: `${field} is required` });
            return false;
        }
    }
    return true;
};

export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}