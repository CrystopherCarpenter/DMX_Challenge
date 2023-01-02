import { loginService } from '../services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const result = await loginService.login({ username, password });

  res.status(httpStatus.OK).send(result);
};
