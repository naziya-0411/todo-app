import { otpModel } from '../models/otpDB.js';
import otpGenerator from 'otp-generator';
import { mailSender } from '../utils/mailSender.js';

export default class otpController {
  sendOTP = async (req, res, next) => {
    try {
      const { email } = req.body;

      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const newOTP = new otpModel({ email, otp });
      await newOTP.save();

      // Send OTP via email
      await mailSender({
        to: email,
        subject: 'Your OTP',
        message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
      });

      res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (e) {
      next(e);
    }
  };

  // Verify OTP provided by the user
  verifyOTP = async (req, res, next) => {
    try {
      const { email, otp } = req.query;
      const existingOTP = await otpModel.findOneAndDelete({ email, otp });

      if (existingOTP) {
        res
          .status(200)
          .json({ success: true, message: 'OTP verification successful' });
      } else {
        res.status(400).json({ success: false, error: 'Invalid OTP' });
      }
    } catch (e) {
      next(e);
    }
  };
}
