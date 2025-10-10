import express from 'express';

import taskController from '../controllers/taskController.js';
import toDoValidations from '../validations/middlewares/taskValidation.js';

const validationInstance = new toDoValidations();
const taskControllerInstance = new taskController();
const todoRouter = express.Router();

todoRouter.get('/', taskControllerInstance.getAllTasks);
todoRouter.post('/',validationInstance.validateRequest, taskControllerInstance.addNewTask);//adding middleware for data validation.
todoRouter.patch('/:id', taskControllerInstance.updateCompletionStatus);
todoRouter.put('/:id',validationInstance.updateRequest, taskControllerInstance.updateTask);//adding middleware for data validation.
todoRouter.delete('/:id', taskControllerInstance.deleteTask);
todoRouter.get('/search', taskControllerInstance.searchTask);
todoRouter.get('/sort', taskControllerInstance.sortTask);

export default todoRouter;