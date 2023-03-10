import { validateBody } from '../middlewares';
import { userSchema } from '../schemas';
import { Router } from 'express';
import { login } from '../controllers';
import httpStatus from 'http-status';

const loginRouter = Router();

loginRouter.post('/', validateBody(userSchema), login).post('/*', () => {
  throw httpStatus.NOT_FOUND;
});

export { loginRouter };
