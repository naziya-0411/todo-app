import { taskModel } from '../models/taskDb.js';

export default class userController {
  loginUser = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      const token = createAccessKey();

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  };

  createAccessKey = async (req, res, next) => {
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '6h',
    });
    return token;
  };

  
}
