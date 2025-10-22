// routes/otpRoutes.js
import express from 'express';
import OtpController from '../controllers/OtpController.js';

const otpInstance = new OtpController();

const otpRouter = express.Router();

otpRouter.post('/send-otp', otpInstance.sendOtp);
otpRouter.post('/verify-otp', otpInstance.verifyOtp);

export { otpRouter };
