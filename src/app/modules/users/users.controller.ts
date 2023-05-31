import { Request, Response } from 'express'
import { createUserToDB } from './users.service'

export const createUser = async (req: Request, res: Response) => {
  const { user } = req.body
  try {
    const result = await createUserToDB(user)

    res.status(200).send({
      status: true,
      result: result,
    })
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error,
    })
  }
}
