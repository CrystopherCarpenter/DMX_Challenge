import { validateBody } from '../middlewares';
import { userSchema } from '../schemas';
import { Router } from 'express';
import { createUser } from '../controllers';
import httpStatus from 'http-status';

const userRouter = Router();

userRouter.post('/', validateBody(userSchema), createUser).post('/*', () => {
  throw httpStatus.NOT_FOUND;
});

export { userRouter };
