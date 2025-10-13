import express from 'express';
import userController from '../controllers/userController.js';
const userRouter = express.Router();

const userInstance = new userController();

userRouter.get('/login',  );
userRouter.get('/register', )
userRouter.post('/login', userInstance.loginUser);
userRouter.post('/register', userInstance.registerUser);

export default userRouter;
