import express from 'express';
import {
    getAllTasks,
    addNewTask,
    updateCompletionStatus,
    updateTask,
    deleteTask,
} from '../controllers/controller.js';
import { dataValidation } from '../validations/validator.js';
// import { dataValidation } from '../validations/validator.js';

const todoRouter = express.Router();

todoRouter.get('/', getAllTasks);
todoRouter.post('/', addNewTask);//adding middleware for data validation.
todoRouter.patch('/:id', updateCompletionStatus);
todoRouter.put('/:id', updateTask);//adding middleware for data validation.
todoRouter.delete('/:id', deleteTask);

export default todoRouter;