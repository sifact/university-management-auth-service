import { NextFunction, Request, Response } from 'express';
import { AnyObject } from 'mongoose';

export const validateRequest =
  (schema: AnyObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      return next();
    } catch (err) {
      next(err);
    }
  };
