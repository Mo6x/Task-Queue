import { Router } from 'express';
import { createTask } from '../controllers/taskController';

const router = Router();

// Ensure `createTask` is correctly passed as a middleware function
router.post('/tasks', createTask);

export default router;
