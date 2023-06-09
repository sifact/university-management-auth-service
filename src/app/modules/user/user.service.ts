import config from '../../../config';
import { ApiError } from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId();

  user.id = id;

  if (!user.password) {
    user.password = config.defaultUserPass as string;
  }

  const createUser = await User.create(user);

  if (!createUser) throw new ApiError(400, 'Failed to create user!');

  return createUser;
};

export const UserService = {
  createUserToDB,
};
