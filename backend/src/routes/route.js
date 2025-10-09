import express from 'express';
import {
    getAllTasks,
    addNewTask,
    updateCompletionStatus,
    updateTask,
    deleteTask,
    searchTask,
    sortTask,
} from '../controllers/control.js';

import toDoValidations from '../validations/middlewares/validations.js';
const validationInstance = new toDoValidations();

const todoRouter = express.Router();

todoRouter.get('/', getAllTasks);
todoRouter.post('/',validationInstance.validateRequest, addNewTask);//adding middleware for data validation.
todoRouter.patch('/:id', updateCompletionStatus);
todoRouter.put('/:id',validationInstance.updateRequest, updateTask);//adding middleware for data validation.
todoRouter.delete('/:id', deleteTask);
todoRouter.get('/search', searchTask);
todoRouter.get('/sort', sortTask);

export default todoRouter;