// routes/otpRoutes.js
import express from 'express';
import otpController from '../controllers/otpController.js';

const otpInstance = new otpController();

const otpRouter = express.Router();

otpRouter.post('/sendOTP', otpInstance.sendOTP);
otpRouter.post('/verifyOTP', otpInstance.verifyOTP);
otpRouter.post('/resendOTP', otpInstance.sendOTP);

export {
    otpRouter,
}