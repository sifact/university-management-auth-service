import express, { Application } from 'express';

import cors from 'cors';
import userRouter from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import { ApiError } from './errors/ApiError'

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(app.get('env'));
// routes

// Testing
// app.get('/', (req, res, next) => {
//   console.log(x)
// })
app.use('/api/v1/users/', userRouter);
app.use(globalErrorHandler);

export default app;
