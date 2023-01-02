import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from '../services/user-service';

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const result = await userService.createUser({ username, password });

  res.status(httpStatus.OK).send(result);
};
