import { Redis } from 'ioredis';
export const redisClient = new Redis();


// tests/taskService.test.ts
import { addTaskToQueue } from '../services/taskService';
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
        const taskData = { message: 'Test task' };
        const task = await addTaskToQueue(taskData);
        expect(task).toBeDefined();
        const savedTask = await TaskModel.findById(task.data.taskId);
        expect(savedTask).not.toBeNull();
    });
});
