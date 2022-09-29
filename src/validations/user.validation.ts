import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const userValidation = () => [
  body('name').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('country').not().isEmpty().trim().escape(),
  body('phone').not().isEmpty().trim().escape()
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({
    status: 'error',
    payload: errors.array(),
  });
};
