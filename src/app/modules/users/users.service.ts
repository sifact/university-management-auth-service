import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

export const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()
  user.id = id

  if (!user.password) {
    user.password = config.defaultUserPass as string
  }

  const createUser = await User.create(user)

  if (!createUser) throw new Error('Failed to create user!')

  return createUser
}
