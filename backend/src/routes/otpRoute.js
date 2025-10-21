// routes/otpRoutes.js
import express from 'express';
import OTPController from '../controllers/OTPController.js';

const otpInstance = new OTPController();

const otpRouter = express.Router();

otpRouter.post('/sendOTP', otpInstance.sendOTP);
otpRouter.post('/verifyOTP', otpInstance.verifyOTP);

export { otpRouter };
