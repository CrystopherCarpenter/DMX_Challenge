import { validateBody } from '../middlewares';
import { loginSchema } from '../schemas';
import { Router, Request, Response } from 'express';
import { login } from '../controllers';

const loginRouter = Router();

loginRouter.post('/', validateBody(loginSchema), login).post('/*', (_req: Request, res: Response) => {
  res.sendStatus(404);
});

export { loginRouter };
