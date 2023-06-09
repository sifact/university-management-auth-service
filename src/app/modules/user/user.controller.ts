import { RequestHandler } from 'express';
import { UserService } from './user.service';

export const createUser: RequestHandler = async (req, res, next) => {
  // req-validation
  // body --> object
  // data --> object

  const user = req.body;

  try {
    const result = await UserService.createUserToDB(user);

    res.status(200).send({
      status: true,
      result: result,
    });
  } catch (err) {
    next(err);
  }
};
