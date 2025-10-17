import express from 'express';
import cors from 'cors';
import { PORT, DOMAIN, URI } from '../constants.js';
import taskRouter from './routes/taskRoute.js';
import userRouter from './routes/userRoute.js';
// import protectedRouter from './routes/protectedRoute.js'
import { connectToMongoDB } from '../DB/connect.js';
import { loggerMiddleware } from './middlewares/logger.js';
import { otpRouter } from './routes/otpRoute.js';
import verifyToken from './middlewares/tokenVerification.js';

const app = express();
const port = PORT;
const domain = DOMAIN;
const uri = URI;

connectToMongoDB(uri);

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'authorization'],
  })
);
app.use(express.json());
app.use(express.static('public'));
app.use(loggerMiddleware);

app.use('/user', userRouter);
// app.use('/protected', protectedRouter);
app.use('/otp', otpRouter);
app.use('/', verifyToken, taskRouter);

//global middleware for catching error.
app.use((err, req, res) => {
  try {
    const status = err.status || 500;

    res.status(status).json({
      error: err.message || 'Server Error',
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server Running At ${domain}:${port}`);
});
