import { Request, Response } from 'express';
import { addEmailTask } from '../services/taskService';


export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return;
        }

        const task = await addEmailTask(email);
        res.status(201).json({ message: 'Task added to queue', taskId: task.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding task to queue' });
    }
};
