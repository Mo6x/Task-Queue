import { Worker } from 'bullmq';
import { redisClient } from '../config/redis';
import { TaskModel } from '../models/taskModel';
import { sendApprovedEmail } from '../emails/emailService';


const worker = new Worker('taskQueue', async (job) => {
    const task = await TaskModel.findById(job.data.taskId);
    if (!task) return;

    task.status = 'processing';
    await task.save();

  
    try {
        await sendApprovedEmail(task.data.email);
        task.status = 'completed';
        await task.save();
    } catch (error) {
        console.error('Email sending failed:', error);
        task.status = 'failed';
        await task.save();
    }
}, { connection: redisClient });
