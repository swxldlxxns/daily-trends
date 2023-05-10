import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const errors = validationResult(req);

  if (errors.array().length)
    return res
      .status(400)
      .json(
        [...new Set(errors.array().map((obj) => JSON.stringify(obj)))].map(
          (str) => JSON.parse(str),
        ),
      );

  next();
};
