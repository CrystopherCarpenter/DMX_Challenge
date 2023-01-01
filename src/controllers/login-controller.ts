import { loginService } from '../services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const result = await loginService.login({ username, password });

  res.status(httpStatus.OK).send(result);
}
