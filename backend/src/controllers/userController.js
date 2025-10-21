import { userModel } from '../models/userDB.js';
import bcrypt from 'bcrypt';
import {
  getAccessToken,
  getRefreshToken,
  verifyRefreshToken,
} from '../utils/jwtUtils.js';

export default class userController {
  registerUser = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.findOne({ email });
      console.log("this is the user", user);

      if (user) {
        const err = new Error('User already exists! Please login');
        err.statusCode = 401;
        throw err;
      }

      const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
      });

      if (!newUser) {
        const err = new Error('Unable to register user! Please try again.');
        err.statusCode = 400;
        throw err;
      }
      res
        .status(201)
        .json({ success: true, message: 'User generated successfully' });
    } catch (e) {
      next(e);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'User not found! Please register to continue' });
      }

      if (!user.isVerified) {
        return res.status(401).json({
          error: "Account not verified. Please verify your email before logging in.",
          redirect: "/pages/otp?type=reset"
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      const accessToken = await getAccessToken(user);
      const refreshToken = await getRefreshToken(user);

      user.isVerified = true;
      await user.save();

      res.status(200).json({ user, accessToken, refreshToken });
    } catch (e) {
      next(e);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const header = req.headers['refreshtoken'];

      const refreshToken = header.split(' ')[1];

      console.log('inside refresh token', refreshToken);

      const payload = await verifyRefreshToken(refreshToken);
      console.log("this is payload", payload);

      const user = await userModel.findById(payload.userId);
      console.log("this is user", user)

      if (!user) {
        throw new Error('user not found', { statusCode: 404 });
      }

      const newAccessToken = await getAccessToken(user);
      const newRefreshToken = await getRefreshToken(user);

      console.log(newAccessToken);

      return res.status(200).json({ refreshToken: newRefreshToken, accessToken: newAccessToken });
    } catch (e) {
      console.error('Error refreshing token:', e);
      next(e);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      if (!email || !password) {
        throw new Error('Email and new password are required', {
          statusCode: 400,
        });
      }

      const user = await userModel.findOne({ email });
      console.log(user);

      if (!user) {
        throw new Error('User with this email does not exist', {
          statusCode: 404,
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Password has been successfully reset',
      });
    } catch (e) {
      console.log(e.message);
      next(e);
    }
  };
}