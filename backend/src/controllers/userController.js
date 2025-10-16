import { userModel } from '../models/userDB.js';
import bcrypt from 'bcrypt';
import { getAccessToken, getRefreshToken } from '../utils/jwtUtils.js';

export default class userController {
  registerUser = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.findOne({ email });

      if (user) {
        throw new Error(
          { message: 'User already exists' },
          { statusCode: 401 }
        );
      }

      const newUser = userModel.create({
        username,
        email,
        password: hashedPassword,
      });

      if (!newUser) {
        throw new Error('Unable to register new user!');
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
        return res.status(401).json({ error: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      const accessToken = await getAccessToken(user);
      const refreshToken = await getRefreshToken(user);
      console.log(
        'this is access and refresh token',
        accessToken,
        refreshToken
      );

      user.isVerified = true;

      res.status(200).json({ user, accessToken, refreshToken });
    } catch (e) {
      next(e);
    }
  };

  refreshToken = (req, res, next) => {

  };

  resetPassword = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      if (!email || !password) {
        throw new Error('Email and new password are required', {statusCode: 400});
      }

      const user = await userModel.findOne({ email });
      console.log(user);

      if (!user) {

        throw new Error('User with this email does not exist', {statusCode: 404});
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
