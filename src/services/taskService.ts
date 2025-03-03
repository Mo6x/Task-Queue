import { Queue } from 'bullmq';
import { redisClient } from '../config/redis';
import { TaskModel } from '../models/taskModel';
import { sendPendingEmail } from '../emails/emailService';


const taskQueue = new Queue('taskQueue', { connection: redisClient });

export const addEmailTask = async (email: string | string[]) => {
   const task = new TaskModel({ data: { email }, status: 'pending' });
   await task.save();

   const emailList = Array.isArray(email) ? email : [email];

   await Promise.all(emailList.map((recipient) => sendPendingEmail(recipient)));

   return await taskQueue.add('approveEmailTask', { taskId: task._id }, { delay: 120000 });
};
