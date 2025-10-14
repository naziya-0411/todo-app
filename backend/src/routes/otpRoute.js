// routes/otpRoutes.js
import Router from 'express';
import otpController from '../controllers/otpController.js';

const otpInstance = new otpController();

const otpRouter = Router();

otpRouter.get('/sendOTP', otpInstance.sendOTP);
otpRouter.get('/verifyOTP', otpInstance.verifyOTP);

export {
    otpRouter,
}