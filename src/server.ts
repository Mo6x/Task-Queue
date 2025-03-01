import express from 'express';
import mongoose from 'mongoose';
import taskRouter from './routes/taskRouter';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(express.json());
app.use('/tasks', taskRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskQueue';

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err: any) => console.error('MongoDB connection error:', err));