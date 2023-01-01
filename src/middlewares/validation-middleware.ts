import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ObjectSchema } from 'joi';

export const validateBody = (schema: ObjectSchema): ValidationMiddleware => {
  return validate(schema);
};

function validate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (!error) {
      next();
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  };
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;
