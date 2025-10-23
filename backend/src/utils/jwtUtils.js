import jwt from 'jsonwebtoken';
import env from '../../constants.js';

const getAccessToken = async (user) => {
  const token = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY, {
    expiresIn: '5s',
  });
  return token;
};

const getRefreshToken = async (user) => {
  const token = jwt.sign({ userId: user._id }, env.JWT_REFRESH_KEY, {
    expiresIn: '90d',
  });

  return token;
};

const verifyRefreshToken = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new Error('No access token provided');
    }

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_KEY);

    return decoded;
  } catch {
    throw new Error('Invalid or expired access token');
  }
};

const verifyAccessToken = (accessToken) => {
  try {
    if (!accessToken) {
      throw new Error('No access token provided');
    }

    const decoded = jwt.verify(accessToken, env.JWT_SECRET_KEY);

    return decoded;
  } catch {
    throw new Error('Invalid or expired access token');
  }
};

export {
  getAccessToken,
  getRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
