import express from 'express';
import cors from 'cors';
import env from '../constants.js';
import taskRouter from './routes/taskRoute.js';
import userRouter from './routes/authRoute.js';
import { connectToMongoDB } from './database/connect.js';
import { loggerMiddleware } from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import verifyToken from './middlewares/tokenVerification.js';

const app = express();

connectToMongoDB(env.URI);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(loggerMiddleware);

app.use('/user/auth', userRouter);
app.use('/', verifyToken, taskRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server Running At ${env.DOMAIN}:${env.PORT}`);
});
