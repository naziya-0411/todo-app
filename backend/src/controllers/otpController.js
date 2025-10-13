import { otpModel } from '../models/otpDB';
import generateOTP from 'otp-generator';
import { mailSender } from '../utils/mailSender.js';

export default class otpController {
  sendOTP = async (email) => {
    try {
      const otp = generateOTP();
      const newOTP = new otpModel({ email, otp });
      await newOTP.save();

      await mailSender({
        to: email,
        subject: 'Your OTP',
        message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
      });

      return { success: true, message: 'OTP sent successfully' };
    } catch {
      return { success: false, message: 'Failed to send OTP' };
    }
  };

  verifyOTP = async (email, otp) => {
    try {
      const existingOTP = await otpModel.findOneAndDelete({ email, otp });

      if (existingOTP) {
        return { success: true, message: 'OTP verified successfully' };
      } else {
        return { success: false, message: 'Wrong OTP provided' };
      }
    } catch {
      return { success: false, message: 'Failed to send OTP' };
    }
  };
}
