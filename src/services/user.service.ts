import { NextFunction } from "express";
import UserModel from "../models/user.model";
import logger from "../utils/logger";
import { CustomException } from "../utils/errors";
import { IUser } from "../interfaces/user.interface";

export const find = async (next: NextFunction) => {
  try {
    const user = await UserModel.find({});
    if (user) {
      return user[0];
    }
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, "Operation unsuccessful"));
  }
};

export const findUserByEmail = async (email: string, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return user;
    }
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, "Operation unsuccessful"));
  }
};

export const findUserById = async (id: string, next: NextFunction) => {
  try {
    const user = await UserModel.findById(id);
    if (user) {
      return user;
    }
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, "Operation unsuccessful"));
  }
};

export const createUser = async (data: IUser, next: NextFunction) => {
  try {
    if (data.id) {
      const user = await findUserById(data?.id, next);
      if (user) {
        const updatedUser = await UserModel.updateOne(
          { _id: user._id },
          { ...data }
        );
        if (updatedUser) {
          return updatedUser;
        }
      } else {
        const user = await UserModel.create(data);
        return user;
      }
    } else {
      const user = await UserModel.create(data);
      return user;
    }
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, "Operation unsuccessful"));
  }
};
