import express from 'express';

import userController from '../controllers/taskController.js';

const userRouter = express.Router();

const userControllerInstance = new userController();

userRouter.get('/login', userControllerInstance.loginUser);

export default userRouter;
