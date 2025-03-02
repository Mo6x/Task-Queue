import { Worker } from 'bullmq';
import { redisClient } from '../config/redis';
import { TaskModel } from '../models/taskModel';


const worker = new Worker('taskQueue', async (job) => {
    const task = await TaskModel.findById(job.data.taskId);
    if (!task) return;
    
    task.status = 'processing';
    await task.save();
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    task.status = 'completed';
    await task.save();
    console.log(`Task ${job.id} completed`);
}, { connection: redisClient });