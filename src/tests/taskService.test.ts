import { addEmailTask } from '../services/taskService';
import { TaskModel } from '../models/taskModel';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

describe('Task Service', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI!);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('Should add a task to the queue', async () => {
        const email = 'test@example.com';

        await addEmailTask(email);

        const savedTask = await TaskModel.findOne({ 'data.email': email });

        expect(savedTask).not.toBeNull();
        expect(savedTask?._id).toBeDefined();
    });
});
