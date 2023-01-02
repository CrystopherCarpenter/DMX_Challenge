import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { prisma } from '../config';

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];
  if (!authorization) throw httpStatus.UNAUTHORIZED;

  const token = authorization.replace('Bearer ', '');
  if (!token) throw httpStatus.UNAUTHORIZED;

  try {
    const { userId } = jwt.verify(token, '890798d0w8qdj7y') as { userId: string };

    const session = await prisma.session.findFirst({
      where: {
        token,
        userId,
      },
    });
    if (!session) return res.sendStatus(401);

    return next();
  } catch {
    throw httpStatus.UNAUTHORIZED;
  }
};
