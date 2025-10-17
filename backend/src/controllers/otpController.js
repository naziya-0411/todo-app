import { userModel } from '../models/userDB.js';
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

      let otpDoc = await otpModel.findOne({ email });

      if (!otpDoc) {
        otpDoc = new otpModel({ email, otp: [] });
      }

      otpDoc.otp.push(otp);
      await otpDoc.save();

      // Send OTP via email
      await mailSender(
        email,
        'Please confirm your OTP',
        `<p>Your OTP is: <strong>${otp}</strong></p>`
      );

      res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (e) {
      next(e);
    }
  };

  async verifyOTP(req, res, next) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res
          .status(400)
          .json({ success: false, message: 'Email and OTP are required' });
      }

      const otpDoc = await otpModel.findOne({ email });
      console.log(otpDoc);

      if (!otpDoc || otpDoc.otp.length === 0) {
        throw new Error('otp not found', { statusCode: 400 });
      }

      const latestOTP = otpDoc.otp[otpDoc.otp.length - 1];
      console.log(latestOTP);

      const now = Date.now();
      const otpCreated = new Date(otpDoc.createdAt).getTime();
      const diff = (now - otpCreated) / 1000;
      console.log(diff);

      if (diff > 5000) {
        return res.status(400).json({
          success: false,
          message: 'OTP expired, please request a new one',
        });
      }

      console.log(now, '   ');
      console.log(otpCreated, ' ');

      console.log(diff);

      if (latestOTP !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }

      const user = userModel.findOne({ email });

      if (user) {
        user.isVerified = true;
      }

      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
      });
    } catch (e) {
      next(e);
    }
  }
}
