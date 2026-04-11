import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/vulnerabilities-demo')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use("/api/auth", userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the server');
})

app.listen(port,() => {
    console.log(`Server listening on port ${port}`);
});
