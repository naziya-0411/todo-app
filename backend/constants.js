import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

const env = {
  PORT: Number(process.env.PORT) || 8000,
  DOMAIN: process.env.DOMAIN || 'http://127.0.0.1',
  URI: process.env.URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_USER: process.env.MAIL_USER,
  REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME,
  ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME,
};

export default env;
