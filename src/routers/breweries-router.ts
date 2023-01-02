import { Router } from 'express';
import httpStatus from 'http-status';
import { getData } from '../controllers';
import { authentication } from '../middlewares';

const breweriesRouter = Router();

breweriesRouter.get('/', authentication, getData).get('/*', () => {
  throw httpStatus.NOT_FOUND;
});

export { breweriesRouter };
