import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY, JWT_REFRESH_KEY } from '../../constants.js';

const getAccessToken = async (user) => {
  const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
  return token;
};

const getRefreshToken = async (user) =>{
    const token = jwt.sign({userId: user._id}, JWT_REFRESH_KEY, {
      expiresIn: '60d',
    });
    return token;
};

export { getAccessToken, getRefreshToken};
