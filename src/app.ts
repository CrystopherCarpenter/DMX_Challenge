import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { connectDb, disconnectDB } from './database';
import dotenv from 'dotenv';

dotenv.config();

import { breweriesRouter, loginRouter, userRouter } from './routers';
import { handleApplicationErrors } from './middlewares/error-handling-middleware';

var morgan = require('morgan');

export const app = express();

app
  .all('/*', morgan('dev'))
  .use(cors())
  .use(express.json())
  .use('/breweries', breweriesRouter)
  .use('/login', loginRouter)
  .use('/user', userRouter)
  .use(handleApplicationErrors);

export const startApp = (): Promise<Express> => {
  connectDb();
  return Promise.resolve(app);
};

export const closeDb = async (): Promise<void> => {
  await disconnectDB();
};
