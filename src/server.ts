import express from 'express';
import mongoose from 'mongoose';
import taskRouter from './routes/taskRouter';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(express.json());

app.use('/api', taskRouter);

const port: string | number = process.env.PORT || '';
(async () => { try {
 await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
 app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });
} catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}) ();