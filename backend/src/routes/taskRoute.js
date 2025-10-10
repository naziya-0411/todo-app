import express from 'express';

import taskController from '../controllers/taskController.js';
import toDoValidations from '../validations/middlewares/taskValidation.js';

const validationInstance = new toDoValidations();
const taskControllerInstance = new taskController();
const taskRouter = express.Router();

taskRouter.get('/', taskControllerInstance.getAllTasks);
taskRouter.post('/',validationInstance.validateRequest, taskControllerInstance.addNewTask);//adding middleware for data validation.
taskRouter.patch('/:id', taskControllerInstance.updateCompletionStatus);
taskRouter.put('/:id',validationInstance.updateRequest, taskControllerInstance.updateTask);//adding middleware for data validation.
taskRouter.delete('/:id', taskControllerInstance.deleteTask);
taskRouter.get('/search', taskControllerInstance.searchTask);
taskRouter.get('/sort', taskControllerInstance.sortTask);

export default taskRouter;