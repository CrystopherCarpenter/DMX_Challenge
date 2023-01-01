import express, { Express } from 'express';
import cors from 'cors';
import { loadEnv, connectDb, disconnectDB } from './config';

loadEnv();

import { breweriesRouter, loginRouter } from './routers';

var morgan = require('morgan');

export const app = express();

app
  .all('/*', morgan('dev'))
  .use(cors())
  .use(express.json())
  .use('/breweries', breweriesRouter)
  .use('/login', loginRouter);

export const startApp = (): Promise<Express> => {
  connectDb();
  return Promise.resolve(app);
};

export const closeDb = async (): Promise<void> => {
  await disconnectDB();
};
