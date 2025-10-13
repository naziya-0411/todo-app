import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../constants.js';

const getAccessToken = async (req, res, next) => {
  const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
    expiresIn: '6h',
  });
  return token;
};

// const getRefreshToken = async ( req, res, next) =>{
//     const token = jwt.sign()
// }

export { getAccessToken };
