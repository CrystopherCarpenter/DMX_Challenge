import { Router, Request, Response } from 'express';
import { authentication } from '../middlewares';

const breweriesRouter = Router();

breweriesRouter
  .get('/', authentication, (_req: Request, res: Response) => {
    res.sendStatus(200);
  })
  .get('/*', (_req: Request, res: Response) => {
    res.sendStatus(404);
  });

export { breweriesRouter };
