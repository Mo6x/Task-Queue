import { Queue } from 'bullmq';
import { redisClient } from '../config/redis';
import { TaskModel } from '../models/taskModel';


const taskQueue = new Queue('taskQueue', { connection: redisClient });

export const addTaskToQueue = async (data: any) => {
    const task = new TaskModel({ data });
    await task.save();
    return await taskQueue.add('processTask', { taskId: task._id });
};
