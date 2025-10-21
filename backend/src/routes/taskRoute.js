import express from 'express';
import taskController from '../controllers/taskController.js';
import toDoValidations from '../validations/middlewares/taskValidation.js';

const validationInstance = new toDoValidations();
const taskInstance = new taskController();
const taskRouter = express.Router();

taskRouter.get('/', taskInstance.getAllTasks);
taskRouter.post(
  '/',
  validationInstance.validateRequest,
  taskInstance.addNewTask
);
taskRouter.patch('/:id', taskInstance.updateCompletionStatus);
taskRouter.put(
  '/:id',
  validationInstance.updateRequest,
  taskInstance.updateTask
);
taskRouter.delete('/:id', taskInstance.deleteTask);
taskRouter.get('/search', taskInstance.searchTask);
taskRouter.get('/sort', taskInstance.sortTask);

export default taskRouter;
