import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];
  if (!authorization) return res.sendStatus(401);

  const token = authorization.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);

  try {
    const { userId } = jwt.verify(token, '890798d0w8qdj7y') as { userId: string };
    res.send(userId);

    next();
    return;
  } catch {
    return res.sendStatus(401);
  }
};
