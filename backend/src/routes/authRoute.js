import express from 'express';
import UserController from '../controllers/AuthController.js';
import verifyToken from '../middlewares/tokenVerification.js';
import UserValidation from '../validations/middlewares/userValidation.js';

const userRouter = express.Router();
const userInstance = new UserController();
const validationInstance = new UserValidation();

userRouter.post('/login', userInstance.loginUser);
userRouter.post('/register', validationInstance.validateUser, userInstance.registerUser);
userRouter.post('/refresh-token', userInstance.refreshToken);
userRouter.post('/reset-password', verifyToken, userInstance.resetPassword);
userRouter.post('/send-otp', userInstance.sendOtp);
userRouter.post('/verify-otp', userInstance.verifyOtp);

export default userRouter;
