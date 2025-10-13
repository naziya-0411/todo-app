import { userModel } from '../models/taskDb.js';
import bcrypt from 'bcrypt';
import { getAccessToken } from '../utils/jwtUtils.js';

export default class userController {
  registerUser = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userModel.create({ username, email, hashedPassword });

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

      const { accessToken } = getAccessToken();

      res.status(200).json({ user, accessToken });
    } catch (e) {
      next(e);
    }
  };
}
