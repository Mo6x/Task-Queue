import { Request, Response } from 'express';
import { addTaskToQueue } from '../services/taskService';


export const createTask = async (req: Request, res: Response) => {
    try {
        const task = await addTaskToQueue(req.body);
        res.status(201).json({ message: 'Task added to queue', taskId: task.id });
    } catch (error) {
        res.status(500).json({ error: 'Error adding task to queue' });
    }
};
