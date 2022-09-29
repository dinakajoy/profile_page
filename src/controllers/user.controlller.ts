import { Request, Response, NextFunction } from 'express';
import { find, createUser, findUserByEmail } from '../services/user.service';
import { CustomException } from '../utils/errors';
import logger from '../utils/logger';

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await find(next);
    if (user) {
      res.render('index', { title: 'User Profile', data: user })
    } else {
      res.render('index', { title: 'User Profile', data: {} })
    }
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if(req?.params) {
      const user = await findUserByEmail(req?.params?.email as string || '', next);
      if (user) {
        res.render('profile', { title: 'Edit Profile', data: user.toJSON() })
      } else {
        res.render('profile', { title: 'Edit Profile', data: {} })
      }
    } else {
      res.render('profile', { title: 'Edit Profile', data: {} })
    }
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const profileUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if(req.body?.email) {
      const user: any = await createUser(req.body, next);
      if (user) {
        return res.status(201).json({
          status: 'success',
          payload: user,
        });
      } else {
        return res.status(404).json({
          status: 'error',
          payload: "Not found!",
        });
      }
    } else {
      return res.status(400).json({
        status: 'error',
        payload: "No data!",
      });
    }
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
