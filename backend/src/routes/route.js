import express from 'express';
import {
    getAllTasks,
    addNewTask,
    updateCompletionStatus,
    updateTask,
    deleteTask,
    searchTask,
} from '../controllers/control.js';

const todoRouter = express.Router();

todoRouter.get('/', getAllTasks);
todoRouter.post('/', addNewTask);//adding middleware for data validation.
todoRouter.patch('/:id', updateCompletionStatus);
todoRouter.put('/:id', updateTask);//adding middleware for data validation.
todoRouter.delete('/:id', deleteTask);
todoRouter.get('/search', searchTask);

export default todoRouter;