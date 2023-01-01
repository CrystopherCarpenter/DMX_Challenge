// import { singInPost, githubSignIn } from '@/controllers';
import { validateBody } from '../middlewares';
import { loginSchema } from '../schemas';
import { Router, Request, Response } from 'express';

const loginRouter = Router();

loginRouter.post('/', validateBody(loginSchema)).post('/*', (_req: Request, res: Response) => {
  res.sendStatus(404);
});

export { loginRouter };
