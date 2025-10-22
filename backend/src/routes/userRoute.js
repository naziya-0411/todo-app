import express from 'express';
import UserController from '../controllers/UserController.js';
const userRouter = express.Router();

const userInstance = new UserController();

userRouter.post('/login', userInstance.loginUser);
userRouter.post('/register', userInstance.registerUser);
userRouter.post('/refresh-token', userInstance.refreshToken);
userRouter.post('/reset-password', userInstance.resetPassword);

export default userRouter;
