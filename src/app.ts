import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from './config';

loadEnv();

// import { breweriesRouter, loginRouter } from './routers';

export const app = express();

app.use(cors()).use(express.json());
// .get('/health', (_req, res) => res.send('OK!'))
// .use('/breweries', breweriesRouter)
// .use('/login', loginRouter)

export const startApp = (): Promise<Express> => {
  connectDb();
  return Promise.resolve(app);
};

export const closeDb = async (): Promise<void> => {
  await disconnectDB();
};
