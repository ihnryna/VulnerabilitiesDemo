import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/vulnerabilities-demo')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the server');
})

app.listen(port,() => {
    console.log(`Server listening on port ${port}`);
});
